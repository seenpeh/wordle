from django.http import JsonResponse
import os


def get_words(request):
    words_file_path = os.path.join(os.path.dirname(
        __file__), '../database/word_today.txt')
    try:
        with open(words_file_path, 'r') as file:
            words = [word.strip() for word in file.readlines() if word.strip()]
        return JsonResponse({'words': words})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


def validate_word(request, word):
    words_file_path = os.path.join(
        os.path.dirname(__file__), '../database/words.txt')
    try:
        with open(words_file_path, 'r') as file:
            valid_words = {word.strip().lower()
                           for word in file.readlines() if word.strip()}
        is_valid = word.lower() in valid_words
        return JsonResponse({'is_valid': is_valid})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
