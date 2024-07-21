import React, { useEffect, useState, useCallback } from 'react';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import Congratulations from './components/Congratulations';
import IncorrectGuess from './components/IncorrectGuess';
import './index.css';
import messages from './messages.json';

const App = () => {
  const [correctWord, setCorrectWord] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [isCorrectGuessed, setIsCorrectGuessed] = useState(false);
  const [congratulatoryMessage, setCongratulatoryMessage] = useState('');
  const [isIncorrectGuessed, setIsIncorrectGuessed] = useState(false);

  const fetchWord = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:8000/api/words/');
      const data = await response.json();
      if (data.words && data.words.length > 0) {
        setCorrectWord(data.words[0].toUpperCase());
      }
    } catch (error) {
      console.error('Error fetching the word:', error);
    }
  }, []);

  const loadFromLocalStorage = () => {
    const savedGuesses = JSON.parse(localStorage.getItem('guesses')) || [];
    const savedCurrentGuess = localStorage.getItem('currentGuess') || '';
    const savedIsCorrectGuessed = localStorage.getItem('isCorrectGuessed') === 'true';
    const savedIsIncorrectGuessed = localStorage.getItem('isIncorrectGuessed') === 'true';

    if (savedGuesses.length > 0 && !savedIsCorrectGuessed && !savedIsIncorrectGuessed) {
      setGuesses(savedGuesses);
    }

    if (savedCurrentGuess && !savedIsCorrectGuessed && !savedIsIncorrectGuessed) {
      setCurrentGuess(savedCurrentGuess);
    }

    if (savedIsCorrectGuessed) {
      setIsCorrectGuessed(true);
      const savedMessage = localStorage.getItem('congratulatoryMessage');
      setCongratulatoryMessage(savedMessage);
    }

    if (savedIsIncorrectGuessed) {
      setIsIncorrectGuessed(true);
    }
  };

  const saveToLocalStorage = () => {
    localStorage.setItem('guesses', JSON.stringify(guesses));
    localStorage.setItem('currentGuess', currentGuess);
    localStorage.setItem('isCorrectGuessed', isCorrectGuessed.toString());
    localStorage.setItem('congratulatoryMessage', congratulatoryMessage);
    localStorage.setItem('isIncorrectGuessed', isIncorrectGuessed.toString());
  };

  useEffect(() => {
    fetchWord();
  }, [fetchWord]);

  useEffect(() => {
    loadFromLocalStorage();
  }, []);

  useEffect(() => {
    saveToLocalStorage();
  }, [guesses, currentGuess, isCorrectGuessed, congratulatoryMessage, isIncorrectGuessed]);

  const validateWord = async (word) => {
    try {
      const response = await fetch(`http://localhost:8000/api/validate_word/${word}/`);
      const data = await response.json();
      return data.is_valid;
    } catch (error) {
      console.error('Error validating the word:', error);
      return false;
    }
  };

  const onKeyPress = useCallback(async (key) => {
    if (key === 'ENTER') {
      if (currentGuess.length === correctWord.length) {
        const isValidWord = await validateWord(currentGuess);
        if (!isValidWord) {
          alert("The word is not valid.");
          return;
        }

        const newGuesses = [...guesses, currentGuess];
        setGuesses(newGuesses);
        if (currentGuess.toUpperCase() === correctWord) {
          const randomMessage = messages[Math.floor(Math.random() * messages.length)];
          setCongratulatoryMessage(randomMessage);
          setIsCorrectGuessed(true);
          setGuesses([]);
          setCurrentGuess('');
        } else if (newGuesses.length === 6) {
          setIsIncorrectGuessed(true);
          setGuesses([]);
          setCurrentGuess('');
        } else {
          setCurrentGuess('');
        }
      }
    } else if (key === 'DELETE') {
      setCurrentGuess(currentGuess.slice(0, -1));
    } else if (currentGuess.length < correctWord.length && /^[A-Z]$/.test(key)) {
      setCurrentGuess(currentGuess + key);
    }
  }, [currentGuess, correctWord, guesses, messages]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key, ctrlKey, altKey, metaKey } = event;
      const upperKey = key.toUpperCase();

      if (!ctrlKey && !altKey && !metaKey) {
        if (upperKey === 'ENTER' || upperKey === 'BACKSPACE' || /^[A-Z]$/.test(upperKey)) {
          event.preventDefault();
          onKeyPress(upperKey === 'BACKSPACE' ? 'DELETE' : upperKey);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onKeyPress]);

  const handleRefresh = () => {
    localStorage.removeItem('guesses');
    localStorage.removeItem('currentGuess');
    localStorage.removeItem('isCorrectGuessed');
    localStorage.removeItem('congratulatoryMessage');
    localStorage.removeItem('isIncorrectGuessed');
    setGuesses([]);
    setCurrentGuess('');
    setIsCorrectGuessed(false);
    setIsIncorrectGuessed(false);
    fetchWord();
  };

  return (
    <div className="App">
      <h1>Wordle</h1>
      {isCorrectGuessed ? (
        <Congratulations message={congratulatoryMessage} onRefresh={handleRefresh} />
      ) : isIncorrectGuessed ? (
        <IncorrectGuess onRefresh={handleRefresh} />
      ) : correctWord ? (
        <>
          <Board guesses={guesses} currentGuess={currentGuess} correctWord={correctWord} />
          <Keyboard onKeyPress={onKeyPress} guesses={guesses} currentGuess={currentGuess} correctWord={correctWord} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;
