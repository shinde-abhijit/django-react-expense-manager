from django.contrib import admin
from .models import Todo


class TodoAdmin(admin.ModelAdmin):
    list_display = ["user", "title", "created_at", "updated_at"]
    list_filter = ["user", "title", "created_at", "updated_at"]
    search_fields = ["user", "title", "created_at", "updated_at"]


admin.site.register(Todo, TodoAdmin)
