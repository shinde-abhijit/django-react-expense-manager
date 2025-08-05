from django.urls import path
from base import views

urlpatterns = [
    path("protected_media/<path:path>", views.protected_media, name="protected_media"),
]
