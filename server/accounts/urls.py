from django.urls import path
from .viewsets import (
    RegisterView, LoginView, LogoutView,
    ProfileView, ProfileUpdateView, ProfileDeleteView
)

urlpatterns = [
    path('api/user-register/', RegisterView.as_view(), name='register'),
    path('api/user-login/', LoginView.as_view(), name='login'),
    path('api/user-logout/', LogoutView.as_view(), name='logout'),
    path('api/user-profile/', ProfileView.as_view(), name='profile'),
    path('api/user-profile/update/', ProfileUpdateView.as_view(), name='profile-update'),
    path('api/user-profile/delete/', ProfileDeleteView.as_view(), name='profile-delete'),
]
