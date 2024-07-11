// src/components/Keyboard.js
import React from 'react';
import Key from './Key';

const Keyboard = ({ onKeyPress }) => {
  const keys = 'QWERTYUIOPASDFGHJKLZXCVBNM'.split('');

  return (
    <div className="keyboard">
      {keys.map((key) => (
        <Key key={key} letter={key} onClick={onKeyPress} />
      ))}
      <Key key="ENTER" letter="ENTER" onClick={onKeyPress} />
      <Key key="DELETE" letter="DELETE" onClick={onKeyPress} />
    </div>
  );
};

export default Keyboard;