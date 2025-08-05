from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.core.exceptions import PermissionDenied
from .models import Expense
from .forms import ExpenseForm
from django.core.paginator import Paginator
from django.contrib.auth.decorators import login_required



@login_required
def add_expense(request):
    if request.method == 'POST':
        form = ExpenseForm(request.POST, request.FILES)
        if form.is_valid():
            expense = form.save(commit=False)
            expense.user = request.user
            expense.save()
            return redirect('expense_list')
    else:
        form = ExpenseForm()
    return render(request, 'expenses/add_expense.html', {'form': form})


@login_required
def expense_list(request):
    expenses = Expense.objects.filter(user=request.user).order_by('-date')
    paginator = Paginator(expenses, 10)  # Show 10 expenses per page

    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    return render(request, 'expenses/expense_list.html', {'page_obj': page_obj})

@login_required
def expense_details(request, pk):
    expense = get_object_or_404(Expense, pk=pk, user=request.user)
    return render(request, 'expenses/expense_details.html', {'expense': expense})


@login_required
def expense_update(request, pk):
    expense = get_object_or_404(Expense, pk=pk, user=request.user)
    if request.method == 'POST':
        form = ExpenseForm(request.POST, request.FILES, instance=expense)
        if form.is_valid():
            form.save()
            return redirect('expense_list')
    else:
        form = ExpenseForm(instance=expense)
    return render(request, 'expenses/expense_update.html', {'form': form})


@login_required
def expense_delete(request, pk):
    expense = get_object_or_404(Expense, pk=pk, user=request.user)
    if request.method == 'POST':
        expense.delete()
        return redirect('expense_list')
    return render(request, 'expenses/expense_delete.html', {'expense': expense})
