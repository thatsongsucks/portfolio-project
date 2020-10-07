from django.db import models

class Job(models.Model):
    image = models.ImageField(upload_to='images/')
    summary = models.CharField(max_length=200)

class Show(models.Model):
    venue = models.CharField(max_length=200)
    venue_url = models.URLField()
    bands = models.CharField(max_length=200)
    date = models.CharField(max_length=200)
    time = models.TimeField()
    flyer = models.ImageField(upload_to='images/')

    def __str__(self):
        return self.date

class MailingListPerson(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField()

    def __str__(self):
        return self.name

class Demo(models.Model):
    name = models.CharField(max_length=100)
    mp3 = models.FileField(upload_to='demos/')
    date_modified = models.DateTimeField(auto_now=True)