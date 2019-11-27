from django.contrib import admin

# Register your models here.
from .models import Job, Show, MailingListPerson

admin.site.register(Job)
admin.site.register(Show)
admin.site.register(MailingListPerson)
