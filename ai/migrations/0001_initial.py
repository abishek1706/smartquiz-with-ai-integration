from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Subject',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('slug', models.SlugField(unique=True)),
                ('icon', models.CharField(max_length=10)),
                ('description', models.TextField(blank=True)),
                ('badge', models.CharField(blank=True, max_length=50)),
                ('order', models.PositiveSmallIntegerField(default=0)),
                ('is_active', models.BooleanField(default=True)),
            ],
            options={
                'ordering': ['order', 'name'],
            },
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('difficulty', models.CharField(
                    choices=[('beginner', 'Beginner'), ('intermediate', 'Intermediate'), ('advanced', 'Advanced')],
                    default='beginner', max_length=20)),
                ('text', models.TextField(verbose_name='Question Text')),
                ('explanation', models.TextField(blank=True, help_text='Shown to the user after they answer.',
                                                  verbose_name='Answer Explanation')),
                ('order', models.PositiveIntegerField(default=0)),
                ('is_active', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('subject', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE,
                                               related_name='questions', to='ai.subject')),
            ],
            options={
                'ordering': ['subject', 'order', 'id'],
            },
        ),
        migrations.CreateModel(
            name='Option',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(max_length=500, verbose_name='Option Text')),
                ('is_correct', models.BooleanField(default=False, verbose_name='Correct Answer')),
                ('order', models.PositiveSmallIntegerField(default=0)),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE,
                                                related_name='options', to='ai.question')),
            ],
            options={
                'ordering': ['order'],
            },
        ),
        migrations.CreateModel(
            name='QuizAttempt',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('score', models.PositiveIntegerField(default=0)),
                ('total', models.PositiveIntegerField(default=0)),
                ('started_at', models.DateTimeField(auto_now_add=True)),
                ('finished_at', models.DateTimeField(blank=True, null=True)),
                ('subject', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ai.subject')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE,
                                            related_name='attempts', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-started_at'],
            },
        ),
    ]