from django.contrib import admin
from .models import Expense


@admin.register(Expense)
class ExpenseAdmin(admin.ModelAdmin):
    list_display = (
        'title', 'user', 'amount', 'category', 'date', 'is_recurring', 'created_at'
    )
    list_filter = ('category', 'is_recurring', 'date', 'created_at')
    search_fields = ('title', 'description', 'notes', 'user__email')
    date_hierarchy = 'date'
    ordering = ('-date',)

    fieldsets = (
        ('Basic Info', {
            'fields': ('user', 'date', 'title', 'amount', 'category')
        }),
        ('Details', {
            'fields': ('description', 'notes', 'receipt')
        }),
        ('Recurring Settings', {
            'fields': ('is_recurring', 'recurring_interval')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',),
        }),
    )
    readonly_fields = ('created_at', 'updated_at')
