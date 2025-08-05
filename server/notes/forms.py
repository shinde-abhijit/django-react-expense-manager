from django import forms
from notes.models import Notes
from base.utils import register_input_classes


class NoteForm(forms.ModelForm):
    class Meta:
        model = Notes
        fields = [
            "title",
            "status",
            "description",
        ]

        labels = {
            "title": "Title",
            "status": "Status",
            "description": "Description",
        }

        widgets = {
            "title": forms.TextInput(
                attrs={
                    "class": register_input_classes,
                    "placeholder": "Enter Title",
                }
            ),
            "status": forms.Select(
                attrs={
                    "class": register_input_classes,
                }
            ),
            "description": forms.TextInput(
                attrs={
                    "class": register_input_classes,
                    "placeholder": "Enter Description",
                }
            ),
        }
