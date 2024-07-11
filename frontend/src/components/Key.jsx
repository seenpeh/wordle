// src/components/Key.js
import React from 'react';

const Key = ({ letter, onClick, status, wide }) => {
  return (
    <button className={`key ${status} ${wide ? 'wide' : ''}`} onClick={() => onClick(letter)}>
      {letter}
    </button>
  );
};

export default Key;
