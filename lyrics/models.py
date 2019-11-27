from django.db import models

# Create your models here.
class Lyrics(models.Model):
    title = models.CharField(max_length=50)
    body = models.TextField()
    album = models.ForeignKey('Album', on_delete=models.CASCADE, related_name='song')
    track_no = models.IntegerField(max_length=2, default='1')

class Album(models.Model):
    title = models.CharField(max_length=50)
    image = models.ImageField(upload_to='images')
    url = models.CharField(max_length=100)
    year = models.CharField(max_length=4)
