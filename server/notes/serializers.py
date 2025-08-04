from rest_framework import serializers
from .models import Notes

class NotesSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)  # Show user name, not just ID

    class Meta:
        model = Notes
        fields = [
            'id', 'user', 'title', 'status', 'description',
            'slug', 'created_at', 'updated_at'
        ]
        read_only_fields = ['slug', 'created_at', 'updated_at']
