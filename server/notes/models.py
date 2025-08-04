from django.db import models
import os
import re
from accounts.models import CustomUser
from django.utils.text import slugify
from django.core.exceptions import ValidationError

class Notes(models.Model):
    STATUS_CHOICES = (
        ('draft', 'Draft'),
        ('published', 'Published'),
    )


    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='notes')
    title = models.CharField(max_length=100)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='draft')
    description = models.TextField(blank=True)
    slug = models.SlugField(unique=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        short_title = self.title[:50] + ('...' if len(self.title) > 50 else '')
        return f"{self.user.first_name} {self.user.last_name} - {short_title}"

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

    def save(self, *args, **kwargs):
        # Call full_clean() before saving
        self.full_clean()

        if not self.slug:
            self.slug = slugify(f"{self.title}-{self.user.id}")
        super().save(*args, **kwargs)

    class Meta:
        ordering = ['-updated_at']
        verbose_name = 'Note'
        verbose_name_plural = 'Notes'
