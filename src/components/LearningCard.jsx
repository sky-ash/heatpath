// src/components/LearningCard.js
import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

export default function LearningCard({ card, nextCard, prevCard }) {
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
  };

  const allCorrect = correctness.every(c => c === true);

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

      <Box mt={2}>
        <Button variant="contained" color="secondary" onClick={prevCard} style={{ marginRight: '1rem' }}>
          Previous
        </Button>
        <Button variant="contained" color="primary" onClick={nextCard} disabled={!allCorrect}>
          Next
        </Button>
      </Box>
    </Box>
  );
}