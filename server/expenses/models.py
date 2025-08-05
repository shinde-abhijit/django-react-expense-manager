from django.db import models
from accounts.models import CustomUser
from django.core.exceptions import ValidationError
import os
import re
from django.utils.text import slugify
from django.utils import timezone
from datetime import datetime
from PIL import Image
from io import BytesIO
from django.core.files.base import ContentFile
from django.utils.timezone import now


def rename_expense_receipt_image(instance, filename):
    ext = filename.split(".")[-1]
    datetime_str = datetime.now().strftime("%Y%m%d%H%M%S")
    category = instance.category or "category"
    recurring_interval = instance.recurring_interval or "recurring_interval"
    new_filename = f"{datetime_str}_{category}_{recurring_interval}.{ext}"
    return os.path.join("expense_receipt", datetime_str, new_filename)


class Expense(models.Model):
    CATEGORY_CHOICES = [
        ('FOOD', 'Food'),
        ('TRAVEL', 'Travel'),
        ('BILLS', 'Bills'),
        ('ENTERTAINMENT', 'Entertainment'),
        ('HEALTH', 'Health'),
        ('OTHER', 'Other'),
    ]

    RECURRING_INTERVAL = [
        ('DAILY', 'Daily'), 
        ('WEEKLY', 'Weekly'), 
        ('MONTHLY', 'Monthly'), 
        ('YEARLY', 'Yearly')
    ]

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="expenses")
    date = models.DateField(default=timezone.now)
    title = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='OTHER')
    description = models.TextField(blank=True, null=True)
    is_recurring = models.BooleanField(default=False)
    recurring_interval = models.CharField(
        max_length=20,
        choices=RECURRING_INTERVAL,
        blank=True,
        null=True
    )
    
    receipt = models.FileField(upload_to=rename_expense_receipt_image, blank=True, null=True)
    notes = models.TextField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def clean(self):
        super().clean()
        if self.date > now().date():
            raise ValidationError({'date': "Expense date cannot be in the future."})

        if not self.title or not self.title.strip():
            raise ValidationError({'title': "Title cannot be empty."})

        if len(self.title.strip()) < 3:
            raise ValidationError({'title': "Title must be at least 3 characters long."})
        
        if len(self.title.strip()) > 100:
            raise ValidationError({'title': "Title cannot exceed 100 characters."})

        if self.amount <= 0:
            raise ValidationError({'amount': "Amount must be greater than zero."})

        if self.is_recurring and not self.recurring_interval:
            raise ValidationError({'recurring_interval': "Recurring interval is required for recurring expenses."})

        if not self.is_recurring and self.recurring_interval:
            raise ValidationError({'recurring_interval': "Recurring interval should be empty for non-recurring expenses."})

        if self.receipt:
            valid_extensions = ['.jpg', '.jpeg', '.png', '.pdf']
            ext = os.path.splitext(self.receipt.name)[1].lower()
            if ext not in valid_extensions:
                raise ValidationError({'receipt': "Only .jpg, .jpeg, .png, or .pdf files are allowed for receipts."})
        
        if self.receipt.size > 2 * 1024 * 1024:
            raise ValidationError({'receipt': "Receipt file size must be under 5MB."})

        
    def save(self, *args, **kwargs):
        if self.receipt and hasattr(self.receipt, 'file') and self.receipt.name.lower().endswith(('.jpg', '.jpeg', '.png')):
            image = Image.open(self.receipt)
            image = image.convert('RGB')
            image.thumbnail((800, 800))  # Resize

            buffer = BytesIO()
            image.save(fp=buffer, format='JPEG')
            file_name = os.path.basename(self.receipt.name)
            self.receipt.save(file_name, ContentFile(buffer.getvalue()), save=False)

        super().save(*args, **kwargs)

    class Meta:
        ordering = ['-date']

    def __str__(self):
        return f"{self.title} - {self.amount}"
