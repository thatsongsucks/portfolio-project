from django.db import models

# Create your models here.
class Blog(models.Model):
    image = models.ImageField(upload_to='images/')
    body = models.TextField()
    pub_date = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=50)

    def __str__(self):
        return self.title

    def summary(self):
        return self.body[:100] + "..."

    def pub_date_pretty(self):
        return self.pub_date.strftime('%b %e %Y')
