from django.shortcuts import render, redirect
from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .forms import (
    CustomUserCreationForm,
    CustomUserLoginForm,
    CustomUserUpdateForm,
    CustomUserDeleteForm,
)


def user_register(request):
    if request.method == "POST":
        form = CustomUserCreationForm(request.POST, request.FILES)
        if form.is_valid():
            user = form.save(commit=False)
            user.set_password(form.cleaned_data["password"])
            user.save()
            messages.success(request, "Registration successful. Please log in.")
            return redirect("user_login")
    else:
        form = CustomUserCreationForm()
    return render(request, "accounts/register.html", {"form": form})


def user_login(request):
    if request.method == "POST":
        form = CustomUserLoginForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            messages.success(request, "Login successful.")
            return redirect("user_profile")
    else:
        form = CustomUserLoginForm()
    return render(request, "accounts/login.html", {"form": form})


@login_required
def user_logout(request):
    if request.method == "POST":
        logout(request)
        messages.info(request, "You have been logged out.")
        return redirect("user_login")
    return render(request, "accounts/logout.html")


@login_required
def user_profile(request):
    return render(request, "accounts/profile.html", {"user": request.user})


@login_required
def user_update(request):
    if request.method == "POST":
        form = CustomUserUpdateForm(request.POST, request.FILES, instance=request.user)
        if form.is_valid():
            form.save()
            messages.success(request, "Profile updated.")
            return redirect("user_profile")
    else:
        form = CustomUserUpdateForm(instance=request.user)
    return render(request, "accounts/update.html", {"form": form})


@login_required
def user_delete(request):
    if request.method == "POST":
        form = CustomUserDeleteForm(request.POST)
        if form.is_valid():
            password = form.cleaned_data["password"]
            if request.user.check_password(password):
                request.user.delete()
                messages.success(request, "Account deleted.")
                return redirect("user_register")
            else:
                messages.error(request, "Incorrect password.")
    else:
        form = CustomUserDeleteForm()
    return render(request, "accounts/delete.html", {"form": form})
