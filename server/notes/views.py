from django.shortcuts import render, get_object_or_404, redirect
from notes.models import Notes
from notes.forms import NoteForm
from django.core.paginator import Paginator
from django.contrib.auth.decorators import login_required


@login_required
def add_note(request):
    if request.method == "POST":
        form = NoteForm(request.POST, request.FILES)
        if form.is_valid():
            note = form.save(commit=False)
            note.user = request.user
            note.save()
            return redirect("note_list")
    else:
        form = NoteForm()
    return render(request, "notes/add_note.html", {"form": form})


@login_required
def update_note(request, pk):
    note = get_object_or_404(Notes, pk=pk)
    if request.method == "POST":
        form = NoteForm(request.POST, request.FILES, instance=note)
        if form.is_valid():
            note = form.save(commit=False)
            note.user = request.user
            note.save()
            return redirect("note_list")
    else:
        form = NoteForm(instance=note)

    return render(request, "notes/update_note.html", {"form": form, "note": note})


@login_required
def delete_note(request, pk):
    note = get_object_or_404(Notes, pk=pk, user=request.user)
    if request.method == "POST":
        note.delete()
        return redirect("note_list")
    return render(request, "notes/delete_note.html", {"note": note})


@login_required
def note_list(request):
    note_list = Notes.objects.filter(user=request.user).order_by("-created_at")
    paginator = Paginator(note_list, 50)
    page_number = request.GET.get("page")
    notes = paginator.get_page(page_number)
    return render(request, "notes/note_list.html", {"notes": notes})


@login_required
def note_details(request, pk):
    note = get_object_or_404(Notes, pk=pk, user=request.user)
    return render(request, "notes/note_details.html", {"note": note})
