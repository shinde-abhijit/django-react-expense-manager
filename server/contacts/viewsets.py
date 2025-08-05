from rest_framework import viewsets, permissions
from .models import Contact
from .serializers import ContactSerializer


class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        # Automatically assign the logged-in user to the contact
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        # Keep the user unchanged during update
        serializer.save(user=self.request.user)

    def get_queryset(self):
        # Each user only accesses their own contacts
        return Contact.objects.filter(user=self.request.user)
