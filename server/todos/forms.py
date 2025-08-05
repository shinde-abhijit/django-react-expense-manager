from django import forms
from todos.models import Todo
from base.utils import register_input_classes


class TodoForm(forms.ModelForm):
    class Meta:
        model = Todo
        fields = [
            "title",
            "status",
            "description",
            "due_date",
        ]

        labels = {
            "title": "Title",
            "status": "Status",
            "description": "Description",
            "due_date": "Due Date",
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
            "due_date": forms.DateInput(
                attrs={
                    "type": "date",
                    "class": register_input_classes,
                }
            ),
        }
