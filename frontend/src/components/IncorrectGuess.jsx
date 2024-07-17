import React from 'react';
import './IncorrectGuess.css';

const IncorrectGuess = ({ onRefresh }) => {
  return (
    <div className="incorrect-guess">
      <h2>Better Luck Next Time!</h2>
      <p>You've used all your guesses. Don't worry, try again!</p>
      <button onClick={onRefresh}>Try Again</button>
    </div>
  );
};

export default IncorrectGuess;
