from django.urls import path
from . import views
from .viewsets import ExpenseViewSet
from django.urls import path, include
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r"expenses", ExpenseViewSet, basename="expense")


urlpatterns = [
    path('add-expense/', views.add_expense, name='add_expense'),
    path('expense-list/', views.expense_list, name='expense_list'),
    path('expense/<int:pk>/details/', views.expense_details, name='expense_details'),
    path('expense/<int:pk>/update/', views.expense_update, name='expense_update'),
    path('expense/<int:pk>/delete/', views.expense_delete, name='expense_delete'),
    path("api/", include(router.urls)),
]
