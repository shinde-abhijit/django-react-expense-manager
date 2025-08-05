from django import forms
from contacts.models import Contact
from base.utils import file_upload_classes, register_input_classes


class ContactForm(forms.ModelForm):
    class Meta:
        model = Contact
        fields = [
            "first_name",
            "last_name",
            "nickname",
            "birth_date",
            "contact",
            "alternate_contact",
            "email",
            "alternate_email",
            "postal_code",
            "address",
            "city",
            "state",
            "country",
            "contact_image",
        ]

        labels = {
            "first_name": "First Name",
            "last_name": "Last Name",
            "nickname": "Nickname",
            "birth_date": "Birth Date",
            "contact": "Contact",
            "alternate_contact": "Alternate Contact",
            "email": "Email",
            "alternate_email": "Alternate Email",
            "postal_code": "Postal Code",
            "address": "Address",
            "city": "City",
            "state": "State",
            "country": "Country",
            "contact_image": "Contact Image",
        }

        widgets = {
            "first_name": forms.TextInput(
                attrs={
                    "class": register_input_classes,
                    "placeholder": "Enter First Name",
                }
            ),
            "last_name": forms.TextInput(
                attrs={
                    "class": register_input_classes,
                    "placeholder": "Enter Last Name",
                }
            ),
            "nickname": forms.TextInput(
                attrs={
                    "class": register_input_classes,
                    "placeholder": "Enter Nick Name",
                }
            ),
            "birth_date": forms.TextInput(
                {
                    "type": "date",
                    "class": register_input_classes,
                }
            ),
            "contact": forms.TextInput(
                attrs={
                    "class": register_input_classes,
                    "placeholder": "Enter Contact Number",
                }
            ),
            "alternate_contact": forms.TextInput(
                attrs={
                    "class": register_input_classes,
                    "placeholder": "Enter Alternate Contact Number",
                }
            ),
            "email": forms.TextInput(
                attrs={
                    "class": register_input_classes,
                    "placeholder": "Enter Email Address",
                }
            ),
            "alternate_email": forms.TextInput(
                attrs={
                    "class": register_input_classes,
                    "placeholder": "Enter Alternate Email Address",
                }
            ),
            "postal_code": forms.TextInput(
                attrs={
                    "class": register_input_classes,
                    "placeholder": "Enter Postal Code",
                }
            ),
            "address": forms.TextInput(
                attrs={
                    "class": register_input_classes,
                    "placeholder": "Enter Address",
                }
            ),
            "city": forms.TextInput(
                attrs={
                    "class": register_input_classes,
                    "placeholder": "Enter City",
                }
            ),
            "state": forms.TextInput(
                attrs={
                    "class": register_input_classes,
                    "placeholder": "Enter State",
                }
            ),
            "country": forms.TextInput(
                attrs={
                    "class": register_input_classes,
                    "placeholder": "Enter Country",
                }
            ),
            "contact_image": forms.ClearableFileInput(
                attrs={
                    "class": file_upload_classes,
                }
            ),
        }
