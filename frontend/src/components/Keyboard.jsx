// src/components/Keyboard.jsx
import React from 'react';
import Key from './Key';

const Keyboard = ({ onKeyPress, guesses, currentGuess, correctWord }) => {
  const firstRow = 'QWERTYUIOP'.split('');
  const secondRow = 'ASDFGHJKL'.split('');
  const thirdRow = 'ZXCVBNM'.split('');

  const getKeyStatus = (key) => {
    let status = '';

    guesses.forEach((guess) => {
      if (guess.includes(key)) {
        if (correctWord.includes(key)) {
          if (guess.indexOf(key) === correctWord.indexOf(key)) {
            status = 'correct';
          } else if (status !== 'correct') {
            status = 'misplaced';
          }
        } else if (status !== 'correct' && status !== 'misplaced') {
          status = 'wrong';
        }
      }
    });

    return status;
  };

  return (
    <div className="keyboard">
      <div className="row">
        {firstRow.map((key) => (
          <Key key={key} letter={key} status={getKeyStatus(key)} onClick={onKeyPress} />
        ))}
      </div>
      <div className="row">
        {secondRow.map((key) => (
          <Key key={key} letter={key} status={getKeyStatus(key)} onClick={onKeyPress} />
        ))}
      </div>
      <div className="row">
        <Key key="ENTER" letter="ENTER" status="" onClick={onKeyPress} wide />
        {thirdRow.map((key) => (
          <Key key={key} letter={key} status={getKeyStatus(key)} onClick={onKeyPress} />
        ))}
        <Key key="DELETE" letter="DELETE" status="" onClick={onKeyPress} wide />
      </div>
    </div>
  );
};

export default Keyboard;
