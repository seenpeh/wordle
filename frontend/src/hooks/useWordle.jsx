// src/hooks/useWordle.jsx
import { useState, useEffect } from 'react';
import { getWords } from '../api/wordApi';

const useWordle = () => {
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [correctWord, setCorrectWord] = useState('');

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const data = await getWords();
        const words = data.words;
        if (words.length > 0) {
          const randomWord = words[Math.floor(Math.random() * words.length)];
          setCorrectWord(randomWord.toUpperCase());
        }
      } catch (error) {
        console.error('Error fetching words:', error);
      }
    };
    fetchWords();
  }, []);

  const onKeyPress = (key) => {
    if (key === 'ENTER') {
      if (currentGuess.length === correctWord.length) {
        setGuesses([...guesses, currentGuess]);
        setCurrentGuess('');
      }
    } else if (key === 'DELETE') {
      setCurrentGuess(currentGuess.slice(0, -1));
    } else if (currentGuess.length < correctWord.length && /^[A-Z]$/.test(key)) {
      setCurrentGuess(currentGuess + key);
    }
  };

  return { guesses, currentGuess, correctWord, onKeyPress };
};

export default useWordle;
