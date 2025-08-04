from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .viewsets import TodoViewSet

router = DefaultRouter()
router.register(r'todos', TodoViewSet, basename='todos')

urlpatterns = [
    path('api/', include(router.urls)),
]
