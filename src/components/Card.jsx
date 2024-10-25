// src/components/Card.js
import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

export default function Card({ card, nextCard, prevCard, onCardCompletion, currentCardIndex, unlockedCards, totalCards }) {
  
  const [answers, setAnswers] = useState(() => {
    const savedAnswers = JSON.parse(localStorage.getItem(`answers-${card.sentence.join(' ')}`)) || [];
    return savedAnswers;
  });

  const [correctness, setCorrectness] = useState([...answers.map((a, i) => a === card.words[i])]);

//  const checkCorrectness = (answer, index) => {
//    return answer === card.words[index];
//    }
//  };
//

  useEffect(() => {
    const newCorrectness = answers.map((a, i) => a === card.words[i]);
    setCorrectness(newCorrectness);

    cardCompletion();

  }, [answers, card.words]);

  
  const cardCompletion = () => {
    if (card.words.length === 0) {
      onCardCompletion();
    } else if (correctness.every(c => c === true)) {
      onCardCompletion();
    } 
  };


  const handleInputChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);

    const newCorrectness = [...correctness];
    newCorrectness[index] = value === card.words[index];
    setCorrectness(newCorrectness);

    localStorage.setItem(`answers-${card.sentence.join(' ')}`, JSON.stringify(newAnswers));

    cardCompletion();
  };

  const allCorrect = correctness.every(c => c === true);

  return (
    <Box className="card">
      <Typography variant="h6" gutterBottom>
        {card.title}
      </Typography>

      <Typography variant="body1" component="div" style={{ marginBottom: '1rem' }}>
        {card.sentence.map((part, index) => {
          const isInputField = part === '___';
          const inputFieldIndex = card.sentence.slice(0, index).filter(p => p === '___').length;

          return (
            <React.Fragment key={index}>
              {!isInputField && part}
              {isInputField && (
                <Box display="inline-flex" alignItems="center" key={index}>
                  <TextField
                    variant="outlined"
                    size="small"
                    value={answers[inputFieldIndex] || ''}
                    onChange={(e) => handleInputChange(inputFieldIndex, e.target.value)}
                    error={correctness[inputFieldIndex] === false}
                    style={{ margin: '0 0.5rem' }}
                  />
                  {correctness[inputFieldIndex] === true && <CheckCircleIcon style={{ color: 'green' }} />}
                  {correctness[inputFieldIndex] === false && <CancelIcon style={{ color: 'red' }} />}
                </Box>
              )}
            </React.Fragment>
          );
        })}
      </Typography>

      <Typography variant="body2" style={{ marginBottom: '1rem' }}>
        Fill out the following words in the empty fields: {card.words.join(', ')}
      </Typography>

      <Box mt={2} display="flex" justifyContent="space-between">
        <Button
          variant="contained"
          color="secondary"
          onClick={prevCard}
          disabled={currentCardIndex === 0 && !unlockedCards.includes(totalCards - 1)}
        >
          Previous
        </Button>
        <Button variant="contained" color="primary" onClick={nextCard} disabled={!allCorrect}>
          Next
        </Button>
      </Box>
    </Box>
  );
}