

# Create your models here.
from django.conf import settings
from django.db import models


SUBJECT_CHOICES = [
    ('python', 'Python'),
    ('java', 'Java'),
    ('c', 'C'),
    ('cpp', 'C++'),
    ('javascript', 'JavaScript'),
]

DIFFICULTY_CHOICES = [
    ('beginner', 'Beginner'),
    ('intermediate', 'Intermediate'),
    ('advanced', 'Advanced'),
]


class Subject(models.Model):
    """Represents a quiz subject/topic."""
    name        = models.CharField(max_length=100)
    slug        = models.SlugField(unique=True)          # e.g. 'python', 'cpp'
    icon        = models.CharField(max_length=10)        # e.g. 'Py', 'C++'
    description = models.TextField(blank=True)
    badge       = models.CharField(max_length=50, blank=True)  # e.g. 'Beginner–Advanced'
    order       = models.PositiveSmallIntegerField(default=0)
    is_active   = models.BooleanField(default=True)

    class Meta:
        ordering = ['order', 'name']

    def __str__(self):
        return self.name


class Question(models.Model):
    """A single quiz question belonging to a subject."""
    subject     = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='questions')
    difficulty  = models.CharField(max_length=20, choices=DIFFICULTY_CHOICES, default='beginner')
    text        = models.TextField(verbose_name='Question Text')
    explanation = models.TextField(blank=True, verbose_name='Answer Explanation',
                                   help_text='Shown to the user after they answer.')
    order       = models.PositiveIntegerField(default=0)
    is_active   = models.BooleanField(default=True)
    created_at  = models.DateTimeField(auto_now_add=True)
    updated_at  = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['subject', 'order', 'id']

    def __str__(self):
        return f"[{self.subject}] {self.text[:60]}"

    def correct_option(self):
        return self.options.filter(is_correct=True).first()


class Option(models.Model):
    """One of the answer options for a Question (supports 4 choices)."""
    question   = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='options')
    text       = models.CharField(max_length=500, verbose_name='Option Text')
    is_correct = models.BooleanField(default=False, verbose_name='Correct Answer')
    order      = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        marker = '✓' if self.is_correct else '✗'
        return f"{marker} {self.text[:50]}"


class QuizAttempt(models.Model):
    """Tracks a single quiz session by a user."""
    user       = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='attempts')
    subject    = models.ForeignKey(Subject, on_delete=models.CASCADE)
    score      = models.PositiveIntegerField(default=0)
    total      = models.PositiveIntegerField(default=0)
    started_at = models.DateTimeField(auto_now_add=True)
    finished_at= models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ['-started_at']

    def __str__(self):
        return f"{self.user} — {self.subject} ({self.score}/{self.total})"

    @property
    def percentage(self):
        return round((self.score / self.total) * 100, 1) if self.total else 0