from django.shortcuts import render
from .models import Job

def home(request):
    jobs = Job.objects
    return render(request, 'jobs/home.html', {'jobs':jobs})


def contact(request):
    return render(request, 'jobs/contact.html')

def shows(request):
    return render(request, 'jobs/shows.html')
