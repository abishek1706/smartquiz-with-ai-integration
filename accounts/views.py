
from django.shortcuts import render,redirect
from .admin import UserCreationForm
from django.contrib.auth import authenticate,login,logout
from django.contrib import messages
from django.views.decorators.http import require_GET, require_POST


def signup(request):
     
    if request.method=="POST":
        # print("this is post request", request.POST)
        submitted_form=UserCreationForm(request.POST)
        if submitted_form.is_valid():
            # print("yes it is valid")
            submitted_form.save()
            messages.success(request,"Signup sucessfull. please login")
            return redirect("login")
        else:
            messages.error(request,"email already taken")
            print("invalid")
        return redirect("signup")
    return render(request,'accounts/signup.html')

def login_view(request):
    if request.method=="POST":
        # print(request.POST)
        user=authenticate(request,
                          email=request.POST.get("email"),
                          password=request.POST.get("password")   
                          )
        # print(user)
        if user is not None:
            # print("user exist")
            login(request,user)
            messages.success(request,"login sucessfull.")
            return redirect("dashboard")
        else:
            messages.error(request,"user with this credentials doesn't exist ")
            return redirect("login")
    return render(request,'accounts/login.html')

from ai.models import Subject   # ← add this import

def dashboard(request):
    subjects = Subject.objects.filter(is_active=True)
    return render(request, 'accounts/dashboard.html', {
        'subjects': subjects,
        # ... your other existing context variables
    })
 





def logout_view(request):
    # Clear old messages first
    storage = messages.get_messages(request)
    for _ in storage:
        pass

    logout(request)
    messages.success(request, "Logged out successfully")
    return redirect("login")
