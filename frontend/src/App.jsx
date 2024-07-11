// src/App.js
import React from 'react';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import useWordle from './hooks/useWordle';
import './index.css';

const App = () => {
  const correctWord = 'REACT';
  const { guesses, currentGuess, onKeyPress } = useWordle(correctWord);

  return (
    <div className="App">
      <h1>Wordle</h1>
      <Board guesses={guesses} currentGuess={currentGuess} correctWord={correctWord} />
      <Keyboard onKeyPress={onKeyPress} />
    </div>
  );
};

export default App;