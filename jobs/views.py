from django.shortcuts import render, redirect
from .models import MailingListPerson, Show

def home(request):
    return render(request, 'jobs/home.html')

def contact(request):
    if request.method == 'POST':
        if request.POST['name'] and request.POST['email']:
            person = MailingListPerson()
            person.name = request.POST['name']
            person.email = request.POST['email']
            person.save()
            return render(request, 'jobs/contact.html', {'success':"You've been added to the Apprehenchmen mailing list!  You won't regret this."})
        else:
            return render(request, 'jobs/contact.html', {'failure':'Enter your name and your email, beloved site user.'})
    else:
        return render(request, 'jobs/contact.html')

def shows(request):
    shows=Show.objects.order_by('-date')
    return render(request, 'jobs/shows.html', {'shows':shows})

def about(request):
    return render(request, 'jobs/about.html')

def harp(request):
    return render(request, 'jobs/harp.html')