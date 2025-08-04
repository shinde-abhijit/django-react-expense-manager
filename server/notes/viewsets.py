from rest_framework import viewsets, permissions
from .models import Notes
from .serializers import NotesSerializer

class NotesViewSet(viewsets.ModelViewSet):
    serializer_class = NotesSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Only show notes belonging to the current user
        return Notes.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Assign the logged-in user to the note
        serializer.save(user=self.request.user)
