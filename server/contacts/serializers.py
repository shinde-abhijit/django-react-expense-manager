from rest_framework import serializers
from .models import Contact


class ContactSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)  # Show user name, not just ID

    class Meta:
        model = Contact
        fields = "__all__"
        read_only_fields = ["created_at", "updated_at"]
