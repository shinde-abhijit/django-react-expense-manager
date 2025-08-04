from django.db import models
from accounts.models import CustomUser
from django.core.exceptions import ValidationError
import os
import re
from django.utils.text import slugify



class Todo(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('completed', 'Completed'),
    ]

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='todos')
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    due_date = models.DateTimeField(null=True, blank=True)
    slug = models.SlugField(unique=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def clean(self):
        # Remove leading/trailing spaces
        self.title = self.title.strip()
        self.description = self.description.strip()

        # Title cannot be only special characters
        if not re.match(r'^[A-Za-z0-9\s]+$', self.title):
            raise ValidationError("Title should contain only letters, numbers, and spaces.")

        # Title must be at least 3 characters long
        if len(self.title) < 3:
            raise ValidationError("Title must be at least 3 characters long.")

        # Optional: Limit description length if needed
        if len(self.description) > 1000:
            raise ValidationError("Description is too long (max 1000 characters).")

    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        # Call full_clean() before saving
        self.full_clean()

        if not self.slug:
            self.slug = slugify(f"{self.title}-{self.user.id}")
        super().save(*args, **kwargs)

    class Meta:
        ordering = ['-updated_at']
        verbose_name = 'Todo'
        verbose_name_plural = 'Todos'
