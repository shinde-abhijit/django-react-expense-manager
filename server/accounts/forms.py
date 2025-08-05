from django import forms
from django.contrib.auth.forms import AuthenticationForm
from .models import CustomUser
from django.core.exceptions import ValidationError
import re
from base.utils import register_input_classes, file_upload_classes


class CustomUserCreationForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)
    confirm_password = forms.CharField(widget=forms.PasswordInput)

    class Meta:
        model = CustomUser
        fields = [
            "first_name",
            "last_name",
            "email",
            "contact",
            "profile_image",
            "password",
            "confirm_password",
        ]
        labels = {
            "first_name": "First Name",
            "last_name": "Last Name",
            "email": "Email",
            "contact": "Contact",
            "profile_image": "Profile Picture",
            "password": "Password",
            "confirm_password": "Confirm Password",
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
            "email": forms.TextInput(
                attrs={
                    "class": register_input_classes,
                    "placeholder": "Enter Email Address",
                }
            ),
            "contact": forms.TextInput(
                attrs={
                    "class": register_input_classes,
                    "placeholder": "Enter Contact Number",
                }
            ),
            "password": forms.TextInput(
                attrs={"class": register_input_classes, "placeholder": "Enter Password"}
            ),
            "confirm_password": forms.TextInput(
                attrs={
                    "class": register_input_classes,
                    "placeholder": "Confirm Password",
                }
            ),
            "profile_image": forms.ClearableFileInput(
                attrs={"class": file_upload_classes}
            ),
        }

    def clean_first_name(self):
        first_name = self.cleaned_data.get("first_name")
        if not first_name.isalpha():
            raise ValidationError(
                "First name should only contain alphabetic characters."
            )
        return first_name

    def clean_last_name(self):
        last_name = self.cleaned_data.get("last_name")
        if not last_name.isalpha():
            raise ValidationError(
                "Last name should only contain alphabetic characters."
            )
        return last_name

    def clean_email(self):
        email = self.cleaned_data.get("email")
        allowed_domains = ["gmail.com", "outlook.com", "live.com", "hotmail.com"]
        domain = email.split("@")[-1]
        if domain not in allowed_domains:
            raise ValidationError(
                f"Email domain must be one of: {', '.join(allowed_domains)}."
            )
        return email

    def clean_contact(self):
        contact = self.cleaned_data.get("contact")
        if not re.match(r"^\d{10,13}$", contact):
            raise ValidationError("Contact number must be between 10 and 13 digits.")
        return contact

    def clean(self):
        cleaned_data = super().clean()
        if cleaned_data.get("password") != cleaned_data.get("confirm_password"):
            raise ValidationError("Passwords do not match.")
        return cleaned_data

    def __init__(self, *args, **kwargs):
        super(CustomUserCreationForm, self).__init__(*args, **kwargs)
        self.fields["password"].widget.attrs.update(
            {"class": register_input_classes, "placeholder": "Enter Password"}
        )
        self.fields["confirm_password"].widget.attrs.update(
            {"class": register_input_classes, "placeholder": "Confirm Password"}
        )


class CustomUserLoginForm(AuthenticationForm):
    username = forms.EmailField(label="Email")
    password = forms.CharField(widget=forms.PasswordInput)

    def __init__(self, *args, **kwargs):
        super(CustomUserLoginForm, self).__init__(*args, **kwargs)
        self.fields["username"].widget.attrs.update(
            {"class": register_input_classes, "placeholder": "Enter Email"}
        )
        self.fields["password"].widget.attrs.update(
            {"class": register_input_classes, "placeholder": "Enter Password"}
        )


class CustomUserUpdateForm(forms.ModelForm):
    class Meta:
        model = CustomUser
        fields = ["first_name", "last_name", "contact", "profile_image"]

    def __init__(self, *args, **kwargs):
        super(CustomUserUpdateForm, self).__init__(*args, **kwargs)
        for field_name, field in self.fields.items():
            field.widget.attrs["class"] = register_input_classes
            if isinstance(field.widget, forms.TextInput):
                field.widget.attrs["placeholder"] = f"Enter {field.label}"

    def clean_first_name(self):
        return CustomUserCreationForm.clean_first_name(self)

    def clean_last_name(self):
        return CustomUserCreationForm.clean_last_name(self)

    def clean_contact(self):
        return CustomUserCreationForm.clean_contact(self)


class CustomUserDeleteForm(forms.Form):
    password = forms.CharField(
        widget=forms.PasswordInput, label="Confirm your password"
    )

    def __init__(self, *args, **kwargs):
        super(CustomUserDeleteForm, self).__init__(*args, **kwargs)
        self.fields["password"].widget.attrs.update(
            {
                "class": register_input_classes,
                "placeholder": "Enter your password to confirm",
            }
        )
