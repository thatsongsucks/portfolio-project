

from django.urls import path
from . import views

urlpatterns = [
    path('', views.lyrics, name='lyrics'),
    path('<str:title>/', views.detail, name='detail'),
]
