from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .viewsets import NotesViewSet

router = DefaultRouter()
router.register(r'notes', NotesViewSet, basename='notes')

urlpatterns = [
    path('api/', include(router.urls)),
]
