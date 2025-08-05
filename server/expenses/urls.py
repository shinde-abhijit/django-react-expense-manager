from django.urls import path
from . import views

urlpatterns = [
    path('add-expense/', views.add_expense, name='add_expense'),
    path('expense-list/', views.expense_list, name='expense_list'),
    path('expense/<int:pk>/details/', views.expense_details, name='expense_details'),
    path('expense/<int:pk>/update/', views.expense_update, name='expense_update'),
    path('expense/<int:pk>/delete/', views.expense_delete, name='expense_delete'),
]
