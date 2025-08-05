from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .viewsets import ContactViewSet
from . import views

router = DefaultRouter()
router.register(r'contacts', ContactViewSet, basename='contact')



urlpatterns = [
    path("contact-list/", views.contact_list, name="contact_list"),
    path("contact-add/", views.add_contact, name="add_contact"),
    path("contact-update/<int:pk>/", views.update_contact, name="update_contact"),
    path("contact-delete/<int:pk>/", views.delete_contact, name="delete_contact"),
    path("contact-details/<int:pk>/", views.contact_details, name="contact_details"),

    path('api/', include(router.urls)),
]
