# wordle/backend/wordleapp/urls.py

from django.urls import path
from .views import get_words

urlpatterns = [
    path('api/words/', get_words, name='get_words'),
]
