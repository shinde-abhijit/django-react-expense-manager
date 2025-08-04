from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .viewsets import ContactViewSet

router = DefaultRouter()
router.register(r'contacts', ContactViewSet, basename='contact')

urlpatterns = [
    path('api/', include(router.urls)),
]
