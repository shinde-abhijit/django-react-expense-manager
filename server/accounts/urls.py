from django.urls import path
from .viewsets import (
    RegisterView, LoginView, LogoutView,
    ProfileView, ProfileUpdateView, ProfileDeleteView
)
from . import views

urlpatterns = [
    path('user-register/', views.user_register, name="user_register"),
    path('user-login/', views.user_login, name="user_login"),
    path('user-logout/', views.user_logout, name="user_logout"),
    path('user-profile/', views.user_profile, name="user_profile"),
    path('user-update/', views.user_update, name="user_update"),
    path('user-delete/', views.user_delete, name="user_delete"),

    # React Routes
    path('api/user-register/', RegisterView.as_view(), name='register'),
    path('api/user-login/', LoginView.as_view(), name='login'),
    path('api/user-logout/', LogoutView.as_view(), name='logout'),
    path('api/user-profile/', ProfileView.as_view(), name='profile'),
    path('api/user-profile/update/', ProfileUpdateView.as_view(), name='profile-update'),
    path('api/user-profile/delete/', ProfileDeleteView.as_view(), name='profile-delete'),
]
