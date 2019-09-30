from django.shortcuts import render, get_object_or_404
from .models import Blog

# Create your views here.
def all_blogs(request):
        blog_posts=Blog.objects
        return render(request, 'blog/all_blogs.html', {'blog_posts':blog_posts})

def detail(request, blog_id):
    post=get_object_or_404(Blog, pk=blog_id)
    return render(request, 'blog/detail.html', {'post':post})
