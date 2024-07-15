import React from 'react';
import './Congratulations.css';

const continue_button = [
    "Keep it coming.",
    "This is endless.",
    "Never stop.",
    "Bring it on.",
    "I need more.",
    "Still going strong.",
    "Can't stop now.",
    "Keep pushing.",
    "More, please.",
    "Don't let up.",
    "Craving more.",
    "Keep at it.",
    "Always more.",
    "Not enough.",
    "Keep it up.",
    "Still hungry.",
    "Need more.",
    "Keep rolling.",
    "Endless energy.",
    "Never enough.",
    "Keep feeding my appetite.",
    "I want it all.",
    "Give me more.",
    "I'm insatiable.",
    "Can't get enough of you.",
    "Keep the fire burning.",
    "Don't stop now.",
    "I crave more.",
    "Keep me satisfied.",
    "Let's keep going.",
    "Feed my desire.",
    "Don't hold back.",
    "Keep it coming, darling.",
    "Can't resist.",
    "I need your touch.",
    "Give me everything.",
    "Keep me wanting.",
    "I'm addicted to you.",
    "More, please.",
    "Keep driving me wild.",
    
]

// Generate a random index based on the length of the array
const randomIndex = Math.floor(Math.random() * continue_button.length);

// Access the word at the random index
const randombutton = continue_button[randomIndex];

const Congratulations = ({ message, onRefresh }) => {
  return (
    <div className="congratulations">
      <h2>{message}</h2>
      <button onClick={onRefresh} className="refresh-button">{randombutton}</button>
    </div>
  );
};

export default Congratulations;
