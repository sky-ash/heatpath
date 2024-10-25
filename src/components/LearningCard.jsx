// src/components/LearningCard.js
import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Box } from '@mui/material';

export default function LearningCard({ card, nextCard, prevCard }) {
  const [answers, setAnswers] = useState([]);
  const [correctness, setCorrectness] = useState([]);

  useEffect(() => {
    const initialAnswers = Array(card.sentence.filter(part => part === '___').length).fill('');
    const initialCorrectness = Array(card.sentence.filter(part => part === '___').length).fill(null);
    setAnswers(initialAnswers);
    setCorrectness(initialCorrectness);
  }, [card.sentence]);

  const handleInputChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);

    const newCorrectness = [...correctness];
    newCorrectness[index] = value === card.correctWords[index];
    setCorrectness(newCorrectness);
  };

  return (
    <Box>
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
                <TextField
                  variant="outlined"
                  size="small"
                  value={answers[inputFieldIndex]}
                  onChange={(e) => handleInputChange(inputFieldIndex, e.target.value)}
                  error={correctness[inputFieldIndex] === false}
                  helperText={correctness[inputFieldIndex] === false ? 'Incorrect' : ''}
                  style={{ margin: '0 0.5rem' }}
                />
              )}
            </React.Fragment>
          );
        })}
      </Typography>

      <Box mt={2}>
        <Button variant="contained" color="secondary" onClick={prevCard} style={{ marginRight: '1rem' }}>
          Previous
        </Button>
        <Button variant="contained" color="primary" onClick={nextCard}>
          Next
        </Button>
      </Box>
    </Box>
  );
}