// src/App.js
import React, { useEffect } from 'react';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import useWordle from './hooks/useWordle';
import './index.css';

const App = () => {
  const correctWord = 'CRAWL';
  const { guesses, currentGuess, onKeyPress, checkGuess } = useWordle(correctWord);

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

  return (
    <div className="App">
      <h1>Wordle</h1>
      <Board guesses={guesses} currentGuess={currentGuess} correctWord={correctWord} checkGuess={checkGuess} />
      <Keyboard 
        onKeyPress={onKeyPress} 
        guesses={guesses} 
        currentGuess={currentGuess} 
        correctWord={correctWord} 
      />
    </div>
  );
};

export default App;
