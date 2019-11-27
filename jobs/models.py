from django.db import models

class Job(models.Model):
    image = models.ImageField(upload_to='images/')
    summary = models.CharField(max_length=200)

class Show(models.Model):
    venue = models.CharField(max_length=200)
    bands = models.CharField(max_length=200)
    date = models.CharField(max_length=200)
    pub_date = models.DateTimeField()
    flyer = models.ImageField(upload_to='images')

class MailingListPerson(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField()
