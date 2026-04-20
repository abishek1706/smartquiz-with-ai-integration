from django.shortcuts import render

import json
import fitz  # PyMuPDF
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from groq import Groq


# ─────────────────────────────────────────────
#  Helper: Extract text from uploaded PDF bytes
# ─────────────────────────────────────────────
def extract_text_from_pdf(pdf_bytes: bytes) -> str:
    """Extract all plain text from a PDF file given as raw bytes."""
    text_parts = []
    with fitz.open(stream=pdf_bytes, filetype="pdf") as doc:
        for page in doc:
            text_parts.append(page.get_text())
    return "\n".join(text_parts).strip()


# ─────────────────────────────────────────────
#  Helper: Build prompt for Groq
# ─────────────────────────────────────────────
def build_prompt(text: str, question_type: str, num_questions: int) -> str:
    """
    Build the prompt sent to Groq based on question type.
    Returns a strict JSON-only prompt.
    """
    # Trim text to avoid token overflow (approx 12000 chars ~ 3000 tokens)
    trimmed_text = text[:12000]

    if question_type == "mcq":
        return f"""You are an expert educator. Based on the following text, generate exactly {num_questions} multiple-choice questions (MCQs).

STRICT OUTPUT FORMAT — respond ONLY with a valid JSON array, no extra text, no markdown:
[
  {{
    "question": "Question text here?",
    "options": {{
      "A": "Option A text",
      "B": "Option B text",
      "C": "Option C text",
      "D": "Option D text"
    }},
    "answer": "A",
    "explanation": "Brief explanation why A is correct."
  }}
]

Rules:
- Exactly {num_questions} questions
- Each question must have exactly 4 options (A, B, C, D)
- "answer" must be one of: A, B, C, D
- Questions must be based ONLY on the provided text
- Do NOT include any text outside the JSON array

TEXT:
{trimmed_text}
"""
    else:  # short_questions
        return f"""You are an expert educator. Based on the following text, generate exactly {num_questions} short answer questions.

STRICT OUTPUT FORMAT — respond ONLY with a valid JSON array, no extra text, no markdown:
[
  {{
    "question": "Question text here?",
    "answer": "Concise answer in 2-4 sentences."
  }}
]

Rules:
- Exactly {num_questions} questions
- Questions must be based ONLY on the provided text
- Answers should be concise and factual (2-4 sentences)
- Do NOT include any text outside the JSON array

TEXT:
{trimmed_text}
"""


# ─────────────────────────────────────────────
#  Helper: Call Groq API
# ─────────────────────────────────────────────
def call_groq(prompt: str) -> str:
    """Send prompt to Groq and return raw response text."""
    client = Groq(api_key=settings.GROQ_API_KEY)
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": (
                    "You are a strict JSON-only responder. "
                    "You NEVER include markdown, code fences, or any text outside the JSON. "
                    "Your entire response must be parseable by json.loads()."
                ),
            },
            {
                "role": "user",
                "content": prompt,
            },
        ],
        model="llama-3.3-70b-versatile",
        temperature=0.4,
        max_tokens=4096,
    )
    return chat_completion.choices[0].message.content.strip()


# ─────────────────────────────────────────────
#  Helper: Parse and validate Groq response
# ─────────────────────────────────────────────
def parse_questions(raw: str, question_type: str) -> list:
    """Parse raw JSON string from Groq, validate structure, return list."""
    # Strip any accidental markdown fences
    cleaned = raw.strip()
    if cleaned.startswith("```"):
        cleaned = cleaned.split("```")[1]
        if cleaned.startswith("json"):
            cleaned = cleaned[4:]
        cleaned = cleaned.strip()

    questions = json.loads(cleaned)

    if not isinstance(questions, list):
        raise ValueError("Response is not a JSON array.")

    validated = []
    for i, q in enumerate(questions):
        if question_type == "mcq":
            if not all(k in q for k in ("question", "options", "answer")):
                raise ValueError(f"MCQ item {i} missing required keys.")
            validated.append({
                "question": str(q["question"]),
                "options": {
                    "A": str(q["options"].get("A", "")),
                    "B": str(q["options"].get("B", "")),
                    "C": str(q["options"].get("C", "")),
                    "D": str(q["options"].get("D", "")),
                },
                "answer": str(q["answer"]).upper(),
                "explanation": str(q.get("explanation", "")),
            })
        else:
            if not all(k in q for k in ("question", "answer")):
                raise ValueError(f"Short question item {i} missing required keys.")
            validated.append({
                "question": str(q["question"]),
                "answer": str(q["answer"]),
            })

    return validated


# ─────────────────────────────────────────────
#  View: Home page
# ─────────────────────────────────────────────
# def index(request):
#     """Render the main upload + generate page."""
#     return render(request, 'quiz/index.html')
def ai_view(request):
    return render(request,"ai/ai.html")


# ─────────────────────────────────────────────
#  View: Generate questions (AJAX POST)
# ─────────────────────────────────────────────
@csrf_exempt
def generate_questions(request):
    """
    Accepts multipart POST with:
      - pdf_file   : uploaded PDF
      - q_type     : 'mcq' or 'short'
      - num_questions: integer 1–20

    Returns JSON:
      { "success": true, "type": "mcq"|"short", "questions": [...] }
      or
      { "success": false, "error": "message" }
    """
    if request.method != 'POST':
        return JsonResponse({'success': False, 'error': 'Only POST requests are allowed.'}, status=405)

    # ── Validate API key ──────────────────────
    if not settings.GROQ_API_KEY:
        return JsonResponse({
            'success': False,
            'error': 'GROQ_API_KEY is not configured. Please add it to your .env file.'
        }, status=500)

    # ── Validate uploaded file ────────────────
    pdf_file = request.FILES.get('pdf_file')
    if not pdf_file:
        return JsonResponse({'success': False, 'error': 'No PDF file uploaded.'}, status=400)

    if not pdf_file.name.lower().endswith('.pdf'):
        return JsonResponse({'success': False, 'error': 'Only PDF files are accepted.'}, status=400)

    if pdf_file.size > 10 * 1024 * 1024:
        return JsonResponse({'success': False, 'error': 'File too large. Maximum size is 10 MB.'}, status=400)

    # ── Validate question type ────────────────
    q_type = request.POST.get('q_type', 'mcq').strip().lower()
    if q_type not in ('mcq', 'short'):
        return JsonResponse({'success': False, 'error': 'Invalid question type. Use "mcq" or "short".'}, status=400)

    # ── Validate number of questions ──────────
    try:
        num_questions = int(request.POST.get('num_questions', 5))
        if not (1 <= num_questions <= 20):
            raise ValueError
    except (ValueError, TypeError):
        return JsonResponse({'success': False, 'error': 'num_questions must be an integer between 1 and 20.'}, status=400)

    # ── Extract PDF text ──────────────────────
    try:
        pdf_bytes = pdf_file.read()
        text = extract_text_from_pdf(pdf_bytes)
    except Exception as e:
        return JsonResponse({'success': False, 'error': f'Failed to read PDF: {str(e)}'}, status=400)

    if len(text) < 100:
        return JsonResponse({
            'success': False,
            'error': 'PDF appears to have very little text. Please upload a text-based PDF (not scanned images).'
        }, status=400)

    # ── Call Groq ─────────────────────────────
    try:
        prompt = build_prompt(text, q_type, num_questions)
        raw_response = call_groq(prompt)
    except Exception as e:
        return JsonResponse({'success': False, 'error': f'Groq API error: {str(e)}'}, status=502)

    # ── Parse response ────────────────────────
    try:
        questions = parse_questions(raw_response, q_type)
    except (json.JSONDecodeError, ValueError, KeyError) as e:
        return JsonResponse({
            'success': False,
            'error': f'Failed to parse AI response: {str(e)}. Please try again.'
        }, status=500)

    return JsonResponse({
        'success': True,
        'type': q_type,
        'questions': questions,
        'count': len(questions),
    })


# Create your views here.
import json
import random
from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.views.decorators.http import require_GET, require_POST
from django.contrib.auth.decorators import login_required
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt

from .models import Subject, Question, QuizAttempt


# ---------------------------------------------------------------------------
# Dashboard — pass subjects to template dynamically
# ---------------------------------------------------------------------------
@login_required
def dashboard(request):
    """Main dashboard; subjects are loaded from the database."""
    subjects = Subject.objects.filter(is_active=True).prefetch_related('questions')
    return render(request, 'accounts/dashboard.html', {'subjects': subjects})


# ---------------------------------------------------------------------------
# API: Get questions for a subject  GET /ai/quiz/questions/?subject=python
# ---------------------------------------------------------------------------
@login_required
@require_GET
def get_questions(request):
    slug = request.GET.get('subject', '').strip().lower()
    if not slug:
        return JsonResponse({'error': 'subject parameter is required'}, status=400)

    subject = get_object_or_404(Subject, slug=slug, is_active=True)

    questions_qs = Question.objects.filter(
        subject=subject, is_active=True
    ).prefetch_related('options')

    # Shuffle and cap at 10 questions per quiz session
    questions = list(questions_qs)
    random.shuffle(questions)
    questions = questions[:10]

    data = []
    for q in questions:
        options = list(q.options.all())
        random.shuffle(options)
        data.append({
            'id': q.id,
            'text': q.text,
            'difficulty': q.difficulty,
            'explanation': q.explanation,
            'options': [
                {'id': o.id, 'text': o.text, 'is_correct': o.is_correct}
                for o in options
            ],
        })

    return JsonResponse({'subject': slug, 'questions': data})


# ---------------------------------------------------------------------------
# API: Submit quiz result  POST /ai/quiz/submit/
# Body JSON: { "subject": "python", "score": 7, "total": 10 }
# ---------------------------------------------------------------------------
@login_required
@require_POST
@csrf_exempt
def submit_quiz(request):
    try:
        body = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)

    slug  = body.get('subject', '')
    score = int(body.get('score', 0))
    total = int(body.get('total', 0))

    subject = get_object_or_404(Subject, slug=slug, is_active=True)

    attempt = QuizAttempt.objects.create(
        user=request.user,
        subject=subject,
        score=score,
        total=total,
        finished_at=timezone.now(),
    )

    return JsonResponse({
        'message': 'Quiz submitted successfully',
        'attempt_id': attempt.id,
        'score': score,
        'total': total,
        'percentage': attempt.percentage,
    })


# ---------------------------------------------------------------------------
# API: Get subjects list  GET /ai/quiz/subjects/
# ---------------------------------------------------------------------------
@login_required
@require_GET
def get_subjects(request):
    subjects = Subject.objects.filter(is_active=True)
    data = [
        {
            'slug': s.slug,
            'name': s.name,
            'icon': s.icon,
            'description': s.description,
            'badge': s.badge,
        }
        for s in subjects
    ]
    return JsonResponse({'subjects': data})