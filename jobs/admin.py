from django.contrib import admin

# Register your models here.
from .models import Job, Show, MailingListPerson, Demo

admin.site.register(Job)
admin.site.register(Show)
admin.site.register(MailingListPerson)
admin.site.register(Demo)
