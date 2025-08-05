from django import forms
from .models import Expense
from django.core.exceptions import ValidationError
from django.utils.timezone import now
import os
from base.utils import register_input_classes


class ExpenseForm(forms.ModelForm):
    class Meta:
        model = Expense
        fields = [
            'date', 'title', 'amount', 'category', 'description',
            'is_recurring', 'recurring_interval', 'receipt', 'notes'
        ]
        labels = {
            'date': 'Date', 'title': 'Title', 'amount': 'Amount', 'category': 'Category', 'description': 'Description',
            'is_recurring': 'is recurring', 'recurring_interval': 'Recurring Interval', 'receipt': 'Receipt', 'notes': 'Notes',
        }
        
        widgets = {
            'date': forms.TextInput(attrs={
                'type':'date',
                'class': register_input_classes,
            }),
            'title': forms.TextInput(attrs={
                'class': register_input_classes,
                'placeholder':'Enter title',
            }),
            'amount': forms.TextInput(attrs={
                'class': register_input_classes,
                'placeholder':'Enter Amount Spent',
            }),
            'category': forms.Select(attrs={
                'class': register_input_classes,
            }),
            'description': forms.TextInput(attrs={
                'class': register_input_classes,
                'placeholder':'Enter Description',
            }),
            'is_recurring': forms.CheckboxInput(attrs={}),
            'recurring_interval': forms.Select(attrs={
                'class': register_input_classes,
            }),
            'receipt': forms.ClearableFileInput(attrs={
                'class': register_input_classes,
            }),
            'notes': forms.TextInput(attrs={
                'class': register_input_classes,
                'placeholder':'Enter note related to transaction',
            }),
        }
        
        
        

    def clean_date(self):
        date = self.cleaned_data.get('date')
        if date and date > now().date():
            raise ValidationError("Expense date cannot be in the future.")
        return date

    def clean_title(self):
        title = self.cleaned_data.get('title', '').strip()
        if not title:
            raise ValidationError("Title cannot be empty.")
        if len(title) < 3:
            raise ValidationError("Title must be at least 3 characters long.")
        if len(title) > 100:
            raise ValidationError("Title cannot exceed 100 characters.")
        return title

    def clean_amount(self):
        amount = self.cleaned_data.get('amount')
        if amount is not None and amount <= 0:
            raise ValidationError("Amount must be greater than zero.")
        return amount

    def clean_receipt(self):
        receipt = self.cleaned_data.get('receipt')
        if receipt:
            ext = os.path.splitext(receipt.name)[1].lower()
            valid_extensions = ['.jpg', '.jpeg', '.png', '.pdf']
            if ext not in valid_extensions:
                raise ValidationError("Only .jpg, .jpeg, .png, or .pdf files are allowed for receipts.")
            if receipt.size > 2 * 1024 * 1024:
                raise ValidationError("Receipt file size must be under 2MB.")
        return receipt

    def clean(self):
        cleaned_data = super().clean()
        is_recurring = cleaned_data.get('is_recurring')
        recurring_interval = cleaned_data.get('recurring_interval')

        if is_recurring and not recurring_interval:
            self.add_error('recurring_interval', "Recurring interval is required for recurring expenses.")
        if not is_recurring and recurring_interval:
            self.add_error('recurring_interval', "Recurring interval should be empty for non-recurring expenses.")
