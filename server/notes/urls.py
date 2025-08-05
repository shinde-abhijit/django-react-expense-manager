from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .viewsets import NotesViewSet
from . import views

router = DefaultRouter()
router.register(r'notes', NotesViewSet, basename='notes')

urlpatterns = [
    path("note-list/", views.note_list, name="note_list"),
    path("note-add/", views.add_note, name="add_note"),
    path("note-update/<int:pk>/", views.update_note, name="update_note"),
    path("note-delete/<int:pk>/", views.delete_note, name="delete_note"),
    path("note-details/<int:pk>/", views.note_details, name="note_details"),

    path('api/', include(router.urls)),
]
