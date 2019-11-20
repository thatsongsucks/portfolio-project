from django.contrib import admin

# Register your models here.
from .models import Job, Show

admin.site.register(Job)
admin.site.register(Show)
