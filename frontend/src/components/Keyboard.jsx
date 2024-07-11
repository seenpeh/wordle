// src/components/Keyboard.js
import React from 'react';
import Key from './Key';



const Keyboard = ({ onKeyPress }) => {
  const firstRow = 'QWERTYUIOP'.split('');
  const secondRow = 'ASDFGHJKL'.split('');
  const thirdRow = 'ZXCVBNM'.split('');

  return (
    <div className="keyboard">
      <div className="row">
        {firstRow.map((key) => (
          <Key key={key} letter={key} onClick={onKeyPress} />
        ))}
      </div>
      <div className="row">
        {secondRow.map((key) => (
          <Key key={key} letter={key} onClick={onKeyPress} />
        ))}
      </div>
      <div className="row">
        {thirdRow.map((key) => (
          <Key key={key} letter={key} onClick={onKeyPress} />
        ))}
        <Key key="ENTER" letter="ENTER" onClick={onKeyPress} />
        <Key key="DELETE" letter="DELETE" onClick={onKeyPress} />
      </div>
    </div>
  );
};

export default Keyboard;
