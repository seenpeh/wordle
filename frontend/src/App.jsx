import React, { useEffect, useState } from 'react';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import './index.css';

const App = () => {
  const [correctWord, setCorrectWord] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');

  // Fetch the correct word from the backend
  useEffect(() => {
    const fetchWord = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/words/');
        const data = await response.json();
        if (data.words && data.words.length > 0) {
          setCorrectWord(data.words[0].toUpperCase());
        }
      } catch (error) {
        console.error('Error fetching the word:', error);
      }
    };

    fetchWord();
  }, []);

  // Load state from localStorage on initial mount
  useEffect(() => {
    const savedGuesses = JSON.parse(localStorage.getItem('guesses')) || [];
    const savedCurrentGuess = localStorage.getItem('currentGuess') || '';

    if (savedGuesses.length > 0) {
      setGuesses(savedGuesses);
    }

    if (savedCurrentGuess) {
      setCurrentGuess(savedCurrentGuess);
    }
  }, []);

  // Save currentGuess and guesses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('guesses', JSON.stringify(guesses));
    localStorage.setItem('currentGuess', currentGuess);
  }, [guesses, currentGuess]);

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

  // Handle keydown events to update currentGuess
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
  }, [currentGuess, guesses]);

  return (
    <div className="App">
      <h1>Wordle</h1>
      {correctWord ? (
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
