// src/components/Card.js

import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

export default function Card({ card, nextCard, prevCard, onCardCompletion, currentCardIndex, unlockedCards, totalCards }) {

  const [answers, setAnswers] = useState([]);
  const [correctness, setCorrectness] = useState([]);

  useEffect(() => {
    const savedAnswers = JSON.parse(localStorage.getItem(`answers-${card.sentence.join(' ')}`)) || [];
    const initialAnswers = Array(card.words.length).fill('');
    const initialCorrectness = Array(card.words.length).fill(null);

    savedAnswers.forEach((answer, index) => {
      initialAnswers[index] = answer;
      initialCorrectness[index] = answer === card.words[index];
    });

    // Check if all answers are correct and call onCardCompletion
    if (initialCorrectness.every(c => c === true)) {
      onCardCompletion();
    }

    setAnswers(initialAnswers);
    setCorrectness(initialCorrectness);
  }, [card.sentence, card.words]);

  const handleInputChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);

    const newCorrectness = [...correctness];
    newCorrectness[index] = value === card.words[index];
    setCorrectness(newCorrectness);

    localStorage.setItem(`answers-${card.sentence.join(' ')}`, JSON.stringify(newAnswers));

    // Check if all answers are correct and call onCardCompletion
    if (newCorrectness.every(c => c === true)) {
      onCardCompletion();
    }
  };

  const allCorrect = correctness.every(c => c === true);

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Button
        color="secondary"
        onClick={prevCard}
        disabled={currentCardIndex === 0 && !unlockedCards.includes(totalCards - 1)}
        startIcon={<ChevronLeft />}>
      </Button>

    <Box className="card" p={2} boxShadow={3} borderRadius={2} bgcolor="background.paper">
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

    </Box>
    
      <Button color="primary" 
              onClick={nextCard} 
              disabled={!allCorrect}
              endIcon={<ChevronRight />}>
      </Button>
    </Box>
  );
}
