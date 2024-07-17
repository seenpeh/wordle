# wordle/backend/wordleapp/views.py

from django.http import JsonResponse
import os


def get_words(request):
    words_file_path = os.path.join(os.path.dirname(
        __file__), '../database/words.txt')  # Update the path
    try:
        with open(words_file_path, 'r') as file:
            words = [word.strip() for word in file.readlines() if word.strip()]
        return JsonResponse({'words': words})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
