from django.shortcuts import render, redirect
from .models import MailingListPerson, Show, Demo
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

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

def demos(request):
    demos=Demo.objects.order_by('-date_modified')
    name_list=[]
    for demo in demos:
        name_list.append(demo.mp3.name)
    current_files = os.listdir(path=os.path.join(BASE_DIR, 'media/demos'))
    fixed_current_files = []
    for item in current_files:
        fixed_current_files.append('demos/' + item)
    for file in fixed_current_files:
        if file not in name_list:
            os.remove(os.path.join(BASE_DIR, f'media/{file}'))
    return render(request, 'jobs/demos.html', {'demos':demos})