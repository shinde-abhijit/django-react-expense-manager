from django.db import models
from accounts.models import CustomUser
from django.core.exceptions import ValidationError
import os
import re
# from django.utils.text import slugify
from django.utils import timezone
from datetime import datetime
# from PIL import Image
# from io import BytesIO
# from django.core.files.base import ContentFile


def rename_contact_image(instance, filename):
    ext = filename.split(".")[-1]
    datetime_str = datetime.now().strftime("%Y%m%d%H%M%S")
    first_name = instance.first_name or "nofirstname"
    last_name = instance.last_name or "nolastname"
    contact_sanitized = instance.contact or "nocontact"
    new_filename = f"{contact_sanitized}_{first_name}_{last_name}_{datetime_str}.{ext}"
    return os.path.join("contact", contact_sanitized, new_filename)


class Contact(models.Model):
    user = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="user_contacts"
    )
    first_name = models.CharField(max_length=50, blank=False)
    last_name = models.CharField(max_length=50, blank=False)
    nickname = models.CharField(max_length=50, blank=True)
    birth_date = models.DateField(blank=True)
    contact = models.CharField(max_length=13, blank=False)
    alternate_contact = models.CharField(max_length=13, blank=True)
    email = models.EmailField()
    alternate_email = models.EmailField(blank=True)
    postal_code = models.CharField(max_length=10, blank=True)
    address = models.TextField(blank=True)
    city = models.CharField(max_length=60, blank=True)
    state = models.CharField(max_length=60, blank=True)
    country = models.CharField(max_length=60, blank=True)
    contact_image = models.ImageField(
        upload_to=rename_contact_image, blank=True, null=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def clean(self):
        # first_name validation
        if self.first_name:
            if not re.fullmatch(r"[A-Za-z ]+", self.first_name):
                raise ValidationError(
                    {"first_name": "First name can only contain alphabets and spaces."}
                )

        # last_name validation
        if self.last_name:
            if not re.fullmatch(r"[A-Za-z ]+", self.last_name):
                raise ValidationError(
                    {"last_name": "Last name can only contain alphabets and spaces."}
                )

        # nickname validation
        if self.nickname:
            if not re.fullmatch(r"[A-Za-z ]+", self.nickname):
                raise ValidationError(
                    {"nickname": "Nickname can only contain alphabets and spaces."}
                )

        # city validation
        if self.city:
            if not re.fullmatch(r"[A-Za-z ]+", self.city):
                raise ValidationError(
                    {"city": "City can only contain alphabets and spaces."}
                )

        # state validation
        if self.state:
            if not re.fullmatch(r"[A-Za-z ]+", self.state):
                raise ValidationError(
                    {"state": "State can only contain alphabets and spaces."}
                )

        # country validation
        if self.country:
            if not re.fullmatch(r"[A-Za-z ]+", self.country):
                raise ValidationError(
                    {"country": "Country can only contain alphabets and spaces."}
                )

        # birth_date validation
        if self.birth_date:
            if self.birth_date > timezone.now().date():
                raise ValidationError(
                    {"birth_date": "Birth date cannot be in the future."}
                )

        # contact validation
        if self.contact:
            if not re.fullmatch(r"\d{10,13}", self.contact):
                raise ValidationError(
                    {
                        "contact": "Contact must be between 10 and 13 digits and contain only numbers."
                    }
                )

        # alternate_contact validation
        if self.alternate_contact:
            if not re.fullmatch(r"\d{10,13}", self.alternate_contact):
                raise ValidationError(
                    {
                        "alternate_contact": "Alternate contact must be between 10 and 13 digits and contain only numbers."
                    }
                )
        # Ensure contact is unique for this user
        if self.contact:
            contact_conflict = (
                Contact.objects.filter(user=self.user, contact=self.contact)
                .exclude(pk=self.pk)
                .first()
            )  # Get the conflicting contact instance

            if contact_conflict:
                raise ValidationError(
                    {
                        "contact": f"This contact already exists for this user: {contact_conflict.first_name} {contact_conflict.last_name}."
                    }
                )

        # Ensure alternate_contact is unique for this user
        if self.alternate_contact:
            alt_contact_conflict = (
                Contact.objects.filter(
                    user=self.user, alternate_contact=self.alternate_contact
                )
                .exclude(pk=self.pk)
                .first()
            )  # Get the conflicting contact instance

            if alt_contact_conflict:
                raise ValidationError(
                    {
                        "alternate_contact": f"This alternate contact already exists for this user: {alt_contact_conflict.first_name} {alt_contact_conflict.last_name}."
                    }
                )
        # Ensure contact is not the same as alternate_contact (for the same instance)
        if (
            self.contact
            and self.alternate_contact
            and self.contact == self.alternate_contact
        ):
            raise ValidationError("Contact and Alternate Contact must be different.")

        # email domain validation
        if self.email:
            allowed_domains = ["gmail.com", "outlook.com", "hotmail.com", "live.com"]
            email_domain = self.email.split("@")[-1].lower()
            if email_domain not in allowed_domains:
                raise ValidationError(
                    {
                        "email": "Email must be from gmail.com, outlook.com, hotmail.com, or live.com."
                    }
                )

        # alternate_email domain validation
        if self.alternate_email:
            allowed_domains = ["gmail.com", "outlook.com", "hotmail.com", "live.com"]
            alternate_email_domain = self.alternate_email.split("@")[-1].lower()
            if alternate_email_domain not in allowed_domains:
                raise ValidationError(
                    {
                        "alternate_email": "Alternate email must be from gmail.com, outlook.com, hotmail.com, or live.com."
                    }
                )

        # postal_code validation
        if self.postal_code:
            if not re.fullmatch(r"[A-Za-z0-9]{1,10}", self.postal_code):
                raise ValidationError(
                    {
                        "postal_code": "Postal code must be up to 10 alphanumeric characters."
                    }
                )

        # address validation
        if self.address:
            if not re.fullmatch(r"[\w\s,.\-#]*", self.address):
                raise ValidationError(
                    {"address": "Address contains invalid characters."}
                )
