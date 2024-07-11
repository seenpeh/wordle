// src/hooks/useWordle.js
import { useState } from 'react';

const useWordle = (correctWord) => {
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');

  const onKeyPress = (key) => {
    if (key === 'ENTER') {
      if (currentGuess.length === correctWord.length) {
        setGuesses([...guesses, currentGuess]);
        setCurrentGuess('');
      }
    } else if (key === 'DELETE') {
      setCurrentGuess(currentGuess.slice(0, -1));
    } else {
      if (currentGuess.length < correctWord.length) {
        setCurrentGuess(currentGuess + key);
      }
    }
  };

  return { guesses, currentGuess, onKeyPress };
};

export default useWordle;