from django.urls import path
from ai import views as ai_views
from . import views

urlpatterns=[
    path("signup/",views.signup,name='signup'),
    path("login/",views.login_view,name='login'),
    path("dashboard/",views.dashboard,name='dashboard'),
    path('logout/', views.logout_view, name='logout'),
    path('ai/', ai_views.dashboard, name='aipage')
   
   
]
