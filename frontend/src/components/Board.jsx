import React from 'react';
import './Board.css';

const Board = ({ guesses, currentGuess, correctWord }) => {
  const rows = 6;
  const columns = 5;

  const createEmptyBoard = () => {
    return Array.from({ length: rows }, () => Array(columns).fill(''));
  };

  const getCellStyle = (letter, index, correctWord, guess) => {
    if (!correctWord.includes(letter)) return 'wrong';
    if (correctWord[index] === letter) return 'correct';
    return 'misplaced';
  };

  const board = createEmptyBoard();

  // Fill board with guesses
  guesses.forEach((guess, rowIndex) => {
    guess.split('').forEach((letter, colIndex) => {
      board[rowIndex][colIndex] = { letter, style: getCellStyle(letter, colIndex, correctWord, guess) };
    });
  });

  // Fill current guess
  currentGuess.split('').forEach((letter, colIndex) => {
    board[guesses.length][colIndex] = { letter, style: '' };
  });

  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <div key={colIndex} className={`cell ${cell.style}`}>
              {cell.letter}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
