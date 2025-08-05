from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .viewsets import TodoViewSet
from . import views

router = DefaultRouter()
router.register(r"todos", TodoViewSet, basename="todos")

urlpatterns = [
    path("todo-list/", views.todo_list, name="todo_list"),
    path("todo-add/", views.add_todo, name="add_todo"),
    path("todo-update/<int:pk>/", views.update_todo, name="update_todo"),
    path("todo-delete/<int:pk>/", views.delete_todo, name="delete_todo"),
    path("todo-details/<int:pk>/", views.todo_details, name="todo_details"),
    path("api/", include(router.urls)),
]
