import React, { useEffect, useState } from 'react';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import Congratulations from './components/Congratulations';
import './index.css';

const App = () => {
  const [correctWord, setCorrectWord] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [isCorrectGuessed, setIsCorrectGuessed] = useState(false);
  const [congratulatoryMessage, setCongratulatoryMessage] = useState('');

  const messages = [
    "Well done on achieving your goal! I guess miracles do happen.",
    "Congrats! You've proven that persistence really can pay off... eventually.",
    "Impressive work! I didn't think you'd actually follow through.",
    "You did it! Now we just need to work on efficiency.",
    "You've reached your goal! It only took twice as long as expected.",
    "You guessed it! Who knew guessing could be your hidden talent?",
    "Wow, you got it right! I guess even a stopped clock is right twice a day.",
    "You guessed the word! I was starting to think you'd never get it.",
    "Nice guess! Your random stabs in the dark finally paid off.",
    "You guessed the word! I'm almost as surprised as you are.",
    "You played the game so well! Beginner's luck must really love you.",
    "Nice playing! Who knew you had such hidden potential?",
    "Great job! You really exceeded my low expectations.",
    "Well played! I didn't think you'd make it this far.",
    "You did great! And here I thought you'd give up.",
    "You found the solution! I knew you could do it... eventually.",
    "Great job! I was starting to think we'd need a miracle.",
    "You solved it! I didn't even have to bribe you with snacks.",
    "Wow, you found the solution! I guess lightning does strike twice.",
    "You did it! I’m almost as impressed as I am surprised.",
    "Fantastic! You solved it without consulting Google... this time.",
    "You found the solution! And it only took twice as long as expected.",
    "You did it! Who knew you had a Sherlock Holmes in you?",
    "Amazing! You found the solution and didn’t even break anything.",
    "You solved it! I was getting ready to call in the experts.",
    "Great job! I was starting to lose hope.",
    "You found the solution! I’ll admit, I had my doubts.",
    "You did it! I guess persistence really does pay off.",
    "Nice work! I was expecting to be here all day.",
    "You found the solution! Maybe you should try for Mensa next.",
    "You did it! And here I thought we’d be stuck forever.",
    "Amazing! You cracked it just before I ran out of patience.",
    "You found the solution! I’m genuinely impressed and slightly confused.",
    "Great job! Now, can you solve world peace next?",
    "You did it! I guess even the most complex problems have simple solutions... eventually.",
  ];

  // Fetch the correct word from the backend
  useEffect(() => {
    const fetchWord = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/words/');
        const data = await response.json();
        if (data.words && data.words.length > 0) {
          setCorrectWord(data.words[0].toUpperCase());
        }
      } catch (error) {
        console.error('Error fetching the word:', error);
      }
    };

    fetchWord();
  }, []);

  // Load state from localStorage on initial mount
  useEffect(() => {
    const savedGuesses = JSON.parse(localStorage.getItem('guesses')) || [];
    const savedCurrentGuess = localStorage.getItem('currentGuess') || '';
    const savedIsCorrectGuessed = localStorage.getItem('isCorrectGuessed') === 'true';

    if (savedGuesses.length > 0 && !savedIsCorrectGuessed) {
      setGuesses(savedGuesses);
    }

    if (savedCurrentGuess && !savedIsCorrectGuessed) {
      setCurrentGuess(savedCurrentGuess);
    }

    if (savedIsCorrectGuessed) {
      setIsCorrectGuessed(true);
      const savedMessage = localStorage.getItem('congratulatoryMessage');
      setCongratulatoryMessage(savedMessage);
    }
  }, []);

  // Save currentGuess, guesses, and isCorrectGuessed to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('guesses', JSON.stringify(guesses));
    localStorage.setItem('currentGuess', currentGuess);
    localStorage.setItem('isCorrectGuessed', isCorrectGuessed.toString());
    localStorage.setItem('congratulatoryMessage', congratulatoryMessage);
  }, [guesses, currentGuess, isCorrectGuessed, congratulatoryMessage]);

  const onKeyPress = (key) => {
    if (key === 'ENTER') {
      if (currentGuess.length === correctWord.length) {
        setGuesses([...guesses, currentGuess]);
        if (currentGuess.toUpperCase() === correctWord) {
          const randomMessage = messages[Math.floor(Math.random() * messages.length)];
          setCongratulatoryMessage(randomMessage);
          setIsCorrectGuessed(true);
        }
        setCurrentGuess('');
      }
    } else if (key === 'DELETE') {
      setCurrentGuess(currentGuess.slice(0, -1));
    } else if (currentGuess.length < correctWord.length && /^[A-Z]$/.test(key)) {
      setCurrentGuess(currentGuess + key);
    }
  };

  // Handle keydown events to update currentGuess
  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key, ctrlKey, altKey, metaKey } = event;
      const upperKey = key.toUpperCase();

      if (!ctrlKey && !altKey && !metaKey) {
        if (upperKey === 'ENTER' || upperKey === 'BACKSPACE' || /^[A-Z]$/.test(upperKey)) {
          event.preventDefault();
          onKeyPress(upperKey === 'BACKSPACE' ? 'DELETE' : upperKey);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentGuess, guesses]);

  const handleRefresh = () => {
    localStorage.removeItem('guesses');
    localStorage.removeItem('currentGuess');
    localStorage.removeItem('isCorrectGuessed');
    localStorage.removeItem('congratulatoryMessage');
    window.location.reload();
  };

  return (
    <div className="App">
      <h1>Wordle</h1>
      {isCorrectGuessed ? (
        <Congratulations message={congratulatoryMessage} onRefresh={handleRefresh} />
      ) : (
        correctWord ? (
          <>
            <Board guesses={guesses} currentGuess={currentGuess} correctWord={correctWord} />
            <Keyboard onKeyPress={onKeyPress} guesses={guesses} currentGuess={currentGuess} correctWord={correctWord} />
          </>
        ) : (
          <p>Loading...</p>
        )
      )}
    </div>
  );
};

export default App;
