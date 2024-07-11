// src/components/Board.js
import React from 'react';

const Board = ({ guesses, currentGuess, correctWord }) => {
  return (
    <div className="board">
      {guesses.map((guess, i) => (
        <div key={i} className="row">
          {guess.split('').map((letter, j) => (
            <div key={j} className={`cell ${getCellStyle(letter, j, correctWord)}`}>{letter}</div>
          ))}
        </div>
      ))}
      {currentGuess && (
        <div className="row">
          {currentGuess.split('').map((letter, j) => (
            <div key={j} className="cell">{letter}</div>
          ))}
        </div>
      )}
    </div>
  );
};

const getCellStyle = (letter, index, correctWord) => {
  if (!correctWord.includes(letter)) return 'wrong';
  if (correctWord[index] === letter) return 'correct';
  return 'misplaced';
};

export default Board;