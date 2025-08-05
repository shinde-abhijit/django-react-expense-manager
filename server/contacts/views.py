from django.shortcuts import render, get_object_or_404, redirect
from contacts.models import Contact
from contacts.forms import ContactForm
from django.core.paginator import Paginator
from django.contrib.auth.decorators import login_required


@login_required
def add_contact(request):
    if request.method == "POST":
        form = ContactForm(request.POST, request.FILES)
        form.instance.user = request.user  # set before is_valid()
        if form.is_valid():
            form.save()
            return redirect("contact_list")
    else:
        form = ContactForm()
    return render(request, "contacts/contact_form.html", {"form": form})


@login_required
def update_contact(request, pk):
    contact = get_object_or_404(Contact, pk=pk)
    if request.method == "POST":
        form = ContactForm(request.POST, request.FILES, instance=contact)
        if form.is_valid():
            contact = form.save(commit=False)
            contact.user = request.user
            contact.save()
            return redirect("contact_list")
    else:
        form = ContactForm(instance=contact)

    return render(
        request, "contacts/update_contact.html", {"form": form, "contact": contact}
    )


@login_required
def delete_contact(request, pk):
    contact = get_object_or_404(Contact, pk=pk, user=request.user)
    if request.method == "POST":
        contact.delete()
        return redirect("contact_list")
    return render(request, "contacts/delete_contact.html", {"contact": contact})


@login_required
def contact_list(request):
    contact_list = Contact.objects.filter(user=request.user).order_by("first_name")
    paginator = Paginator(contact_list, 50)
    page_number = request.GET.get("page")
    contacts = paginator.get_page(page_number)
    return render(request, "contacts/contact_list.html", {"contacts": contacts})


@login_required
def contact_details(request, pk):
    contact = get_object_or_404(Contact, pk=pk, user=request.user)
    return render(request, "contacts/contact_details.html", {"contact": contact})
