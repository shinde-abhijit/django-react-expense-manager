from django import forms
from notes.models import Notes
from base.utils import file_upload_classes, register_input_classes


class NoteForm(forms.ModelForm):
    class Meta:
        model = Notes
        fields = [
            'title', 
            'status', 
            'description', 
        ]

        labels = {
            'title':'title Name', 
            'status':'status Name', 
            'description':'description', 
        }

        widgets = {
            'title': forms.TextInput(attrs={
                'class': register_input_classes,
                'placeholder': 'Enter Title',
            }),
            'status': forms.Select(attrs={
                'class': register_input_classes,
            }),
            'description': forms.TextInput(attrs={
                'class': register_input_classes,
                'placeholder': 'Enter Description',
            }),
        }
