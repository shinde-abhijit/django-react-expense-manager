from django.shortcuts import render, get_object_or_404, redirect
from todos.models import Todo
from todos.forms import TodoForm
from django.core.paginator import Paginator
from django.contrib.auth.decorators import login_required


@login_required
def add_todo(request):
    if request.method == "POST":
        form = TodoForm(request.POST, request.FILES)
        if form.is_valid():
            todo = form.save(commit=False)
            todo.user = request.user
            todo.save()
            return redirect("todo_list")
    else:
        form = TodoForm()
    return render(request, "todos/add_todo.html", {"form": form})


@login_required
def update_todo(request, pk):
    todo = get_object_or_404(Todo, pk=pk)
    if request.method == "POST":
        form = TodoForm(request.POST, request.FILES, instance=todo)
        if form.is_valid():
            todo = form.save(commit=False)
            todo.user = request.user
            todo.save()
            return redirect("todo_list")
    else:
        form = TodoForm(instance=todo)

    return render(request, "todos/update_todo.html", {"form": form, "todo": todo})


@login_required
def delete_todo(request, pk):
    todo = get_object_or_404(Todo, pk=pk, user=request.user)
    if request.method == "POST":
        todo.delete()
        return redirect("todo_list")
    return render(request, "todos/delete_todo.html", {"todo": todo})


@login_required
def todo_list(request):
    todo_list = Todo.objects.filter(user=request.user).order_by("-created_at")
    paginator = Paginator(todo_list, 50)
    page_number = request.GET.get("page")
    todos = paginator.get_page(page_number)
    return render(request, "todos/todo_list.html", {"todos": todos})


@login_required
def todo_details(request, pk):
    todo = get_object_or_404(Todo, pk=pk, user=request.user)
    return render(request, "todos/todo_details.html", {"todo": todo})
