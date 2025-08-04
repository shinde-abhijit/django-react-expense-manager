from django.contrib import admin
from .models import Notes

class NotesAdmin(admin.ModelAdmin):
    list_display = [ 'title', 'user', 'created_at', 'updated_at' ]
    list_filter = [ 'title', 'user', 'created_at', 'updated_at' ]
    search_fields = [ 'title', 'user', 'created_at', 'updated_at' ]
admin.site.register(Notes, NotesAdmin)
