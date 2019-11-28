from django.db import models

# Create your models here.
class Lyrics(models.Model):
    title = models.CharField(max_length=50)
    body = models.TextField()
    album = models.ForeignKey('Album', on_delete=models.CASCADE, related_name='song')
    track_no = models.IntegerField(default='1')

    def __str__(self):
        return self.title

class Album(models.Model):
    title = models.CharField(max_length=50)
    image = models.ImageField(upload_to='images')
    url = models.CharField(max_length=100)
    year = models.CharField(max_length=4)

    def __str__(self):
        return self.title
