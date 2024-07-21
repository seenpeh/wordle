import React from 'react';
import './Board.css';

const Board = ({ guesses, currentGuess, correctWord }) => {
  const rows = 6;
  const columns = 5;

  const createEmptyBoard = () => {
    return Array.from({ length: rows }, () => Array(columns).fill(''));
  };

  const getCellStyle = (letter, index, correctWord, guess, letterCount) => {
    if (correctWord[index] === letter) {
      letterCount[letter]--;
      return 'correct';
    }

    if (correctWord.includes(letter) && letterCount[letter] > 0) {
      letterCount[letter]--;
      return 'misplaced';
    }

    return 'wrong';
  };

  const board = createEmptyBoard();

  // Fill board with guesses
  guesses.forEach((guess, rowIndex) => {
    // Create a count map for the correctWord
    const letterCount = {};
    correctWord.split('').forEach(letter => {
      letterCount[letter] = (letterCount[letter] || 0) + 1;
    });

    guess.split('').forEach((letter, colIndex) => {
      board[rowIndex][colIndex] = { letter, style: getCellStyle(letter, colIndex, correctWord, guess, letterCount) };
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
