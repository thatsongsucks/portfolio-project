

from django.urls import path
from . import views

urlpatterns = [
    path('', views.all_lyrics, name='all_lyrics'),
    path('<str:title>/', views.detail, name='detail'),
]
