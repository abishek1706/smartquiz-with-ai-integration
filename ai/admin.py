from django.contrib import admin

# Register your models here.
from django.contrib import admin
from django.utils.html import format_html
from .models import Subject, Question, Option, QuizAttempt


# ---------------------------------------------------------------------------
# Inline: Options inside Question
# ---------------------------------------------------------------------------
class OptionInline(admin.TabularInline):
    model  = Option
    extra  = 4          # Show 4 blank option rows by default
    fields = ('order', 'text', 'is_correct')
    ordering = ('order',)


# ---------------------------------------------------------------------------
# Subject Admin
# ---------------------------------------------------------------------------
@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    list_display  = ('name', 'slug', 'icon', 'badge', 'order', 'is_active', 'question_count')
    list_editable = ('order', 'is_active')
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ('name', 'slug')

    def question_count(self, obj):
        count = obj.questions.filter(is_active=True).count()
        return format_html('<b>{}</b>', count)
    question_count.short_description = 'Active Questions'


# ---------------------------------------------------------------------------
# Question Admin
# ---------------------------------------------------------------------------
@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display   = ('short_text', 'subject', 'difficulty', 'option_count',
                      'has_correct', 'is_active', 'created_at')
    list_filter    = ('subject', 'difficulty', 'is_active')
    list_editable  = ('is_active',)
    search_fields  = ('text',)
    ordering       = ('subject', 'order')
    inlines        = [OptionInline]
    list_per_page  = 25

    fieldsets = (
        (None, {
            'fields': ('subject', 'difficulty', 'text', 'explanation', 'order', 'is_active')
        }),
    )

    def short_text(self, obj):
        return obj.text[:70] + ('…' if len(obj.text) > 70 else '')
    short_text.short_description = 'Question'

    def option_count(self, obj):
        return obj.options.count()
    option_count.short_description = '# Options'

    def has_correct(self, obj):
        ok = obj.options.filter(is_correct=True).exists()
        icon = '✅' if ok else '❌'
        return format_html('{}', icon)
    has_correct.short_description = 'Correct set?'

    # Validate that exactly one option is marked correct before saving
    def save_related(self, request, form, formsets, change):
        super().save_related(request, form, formsets, change)
        obj = form.instance
        correct_count = obj.options.filter(is_correct=True).count()
        if correct_count != 1:
            self.message_user(
                request,
                f'⚠️ "{obj}" has {correct_count} correct option(s). '
                f'Each question should have exactly 1 correct answer.',
                level='warning',
            )


# ---------------------------------------------------------------------------
# Option Admin (standalone — useful for bulk edits)
# ---------------------------------------------------------------------------
@admin.register(Option)
class OptionAdmin(admin.ModelAdmin):
    list_display  = ('question', 'order', 'text', 'is_correct')
    list_filter   = ('is_correct', 'question__subject')
    search_fields = ('text', 'question__text')
    list_editable = ('is_correct', 'order')


# ---------------------------------------------------------------------------
# QuizAttempt Admin (read-only analytics)
# ---------------------------------------------------------------------------
@admin.register(QuizAttempt)
class QuizAttemptAdmin(admin.ModelAdmin):
    list_display  = ('user', 'subject', 'score', 'total', 'percentage_display',
                     'started_at', 'finished_at')
    list_filter   = ('subject',)
    search_fields = ('user__username',)
    readonly_fields = ('user', 'subject', 'score', 'total', 'started_at', 'finished_at')

    def percentage_display(self, obj):
        pct = obj.percentage
        color = 'green' if pct >= 70 else 'orange' if pct >= 40 else 'red'
        return format_html('<span style="color:{}">{} %</span>', color, pct)
    percentage_display.short_description = 'Score %'