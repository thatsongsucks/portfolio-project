
from django.shortcuts import render, get_object_or_404
from .models import Lyrics

# Create your views here.
def all_lyrics(request):
    lyrics=Lyrics.objects
    return render(request, 'lyrics/all_lyrics.html', {'lyrics':lyrics})

def detail(request, title):
    lyrics=get_object_or_404(Lyrics, title=title)
    return render(request, 'lyrics/detail.html', {'lyrics':lyrics})
