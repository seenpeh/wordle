// src/components/Key.js
import React from 'react';

const Key = ({ letter, onClick }) => {
  return (
    <button className="key" onClick={() => onClick(letter)}>
      {letter}
    </button>
  );
};

export default Key;