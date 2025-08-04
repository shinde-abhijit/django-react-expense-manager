from django.contrib import admin
from contacts.models import Contact

class ContactAdmin(admin.ModelAdmin):

    list_display = [
        'user',
        'first_name',
        'last_name',
        'nickname',
        'birth_date',
        'contact',
        'email',
        'city',
    ]

    list_filter = [
        'first_name',
        'last_name',
        'nickname',
        'birth_date',
        'contact',
        'alternate_contact',
        'email',
        'alternate_email',
        'postal_code',
        'city',
        'state',
        'country',
    ]

    search_fields = [
        'user',
        'first_name',
        'last_name',
        'nickname',
        'birth_date',
        'contact',
        'alternate_contact',
        'email',
        'alternate_email',
        'postal_code',
        'address',
        'city',
        'state',
        'country',
    ]
    
    list_per_page = 100

admin.site.register(Contact, ContactAdmin)