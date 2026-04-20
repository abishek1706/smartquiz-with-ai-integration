from django.urls import path
from . import views


urlpatterns = [
    path("ai_page/",views.ai_view,name="ai_page"),
    path('generate_questions/', views.generate_questions, name='generate_questions'),
    path("dashboard/",views.dashboard,name='dashboard'),
# Quiz API endpoints
    path('quiz/questions/', views.get_questions, name='get_questions'),
    path('quiz/submit/',    views.submit_quiz,   name='submit_quiz'),
    path('quiz/subjects/',  views.get_subjects,  name='get_subjects'),
]

