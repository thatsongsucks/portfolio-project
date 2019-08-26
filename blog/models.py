from django.db import models

# Create your models here.
class Blog(models.Model):
    image = models.ImageField(upload_to='images/')
    body = models.TextField()
    pub_date = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=50)
