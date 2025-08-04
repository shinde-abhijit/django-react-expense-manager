from rest_framework import viewsets, permissions
from .models import Notes
from .serializers import NotesSerializer

class NotesViewSet(viewsets.ModelViewSet):
    serializer_class = NotesSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'slug'  # Add this line to look up by slug

    def get_queryset(self):
        return Notes.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
