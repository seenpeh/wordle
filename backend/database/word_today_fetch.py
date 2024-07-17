import datetime
import os

words_file_path = os.path.join(os.path.dirname(__file__), 'words.txt')
try:
    with open(words_file_path, 'r') as file:
        words = [word.strip() for word in file.readlines() if word.strip()]
except Exception as e:
    print('error')
today_date = datetime.datetime.now().strftime('%Y-%m-%d')
base_date = datetime.datetime.strptime('2024-07-16', '%Y-%m-%d')
date_diff = (datetime.datetime.strptime(
    today_date, '%Y-%m-%d') - base_date).days
today_word_index = date_diff % words.__len__()
today_word = words[today_word_index]
word_today_file_path = os.path.join(
    os.path.dirname(__file__), 'word_today.txt')
try:
    with open(word_today_file_path, 'w') as file:
        file.write(today_word)
except Exception as e:
    print('error')
