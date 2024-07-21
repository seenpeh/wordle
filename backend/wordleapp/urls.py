from django.urls import path
from .views import get_words, validate_word

urlpatterns = [
    path('api/words/', get_words, name='get_words'),
    path('api/validate_word/<str:word>/', validate_word, name='validate_word'),
]
