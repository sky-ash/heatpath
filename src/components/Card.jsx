// src/components/Card.js

import React, { useState, useEffect } from 'react';

// Material-UI components
import { Box, Typography, TextField, Button, Autocomplete } from '@mui/material';

// Material-UI icons
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

// Import parsed lecture content data
import parsedLectureContent from '../data/parsedLectureContent.json';

// Card component
export default function Card({ card, nextCard, prevCard, onCardCompletion, currentCardIndex, unlockedCards, totalCards }) {
  // State to manage answers
  const [answers, setAnswers] = useState([]);

  // State to manage correctness of answers
  const [correctness, setCorrectness] = useState([]);

  // Effect to initialize answers and correctness from localStorage
  useEffect(() => {
    const savedAnswers = JSON.parse(localStorage.getItem(`answers-${card.sentence.join(' ')}`)) || [];
    const initialAnswers = Array(card.words.length).fill('');
    const initialCorrectness = Array(card.words.length).fill(null);

    savedAnswers.forEach((answer, index) => {
      initialAnswers[index] = answer;
      initialCorrectness[index] = answer.toLowerCase() === card.words[index].toLowerCase();
    });

    if (initialCorrectness.every(c => c === true)) {
      onCardCompletion();
    }

    setAnswers(initialAnswers);
    setCorrectness(initialCorrectness);
  }, [card.sentence, card.words]);

  // Function to handle input change
  const handleInputChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);

    const newCorrectness = [...correctness];
    newCorrectness[index] = value.toLowerCase() === card.words[index].toLowerCase();
    setCorrectness(newCorrectness);

    localStorage.setItem(`answers-${card.sentence.join(' ')}`, JSON.stringify(newAnswers));

    if (newCorrectness.every(c => c === true)) {
      onCardCompletion();
    }
  };

  // Check if all answers are correct
  const allCorrect = correctness.every(c => c === true);

  // Get all unique words from the parsed lecture content
  const allLectureWords = [...new Set(parsedLectureContent.lectures.flatMap(lecture => lecture.cards.flatMap(card => card.words.map(word => word.toLowerCase()))))].sort();

  return (
    <Box className="card" p={2} boxShadow={3} borderRadius={2} bgcolor="background.paper">
      {/* Card title */}
      <Typography variant="h6" gutterBottom>
        {card.title}
      </Typography>

      {/* Card sentence with input fields */}
      <Typography variant="body1" align="center" component="div" style={{ marginBottom: '1rem', lineHeight: 2.5 }}>
        {card.sentence.map((part, index) => {
          const isInputField = part === '___';
          const inputFieldIndex = card.sentence.slice(0, index).filter(p => p === '___').length;

          return (
            <React.Fragment key={index}>
              {!isInputField && part}
              {isInputField && (
                <Box key={index} display="inline-flex" alignItems="center" sx={{ verticalAlign: 'middle' }}>
                  {correctness[inputFieldIndex] === true && <CheckCircleIcon style={{ color: 'green', marginLeft: '0.75rem' }} />}
                  {correctness[inputFieldIndex] === false && <CancelIcon style={{ color: 'red', marginLeft: '0.75rem' }} />}
                  <Autocomplete
                    freeSolo
                    disableClearable
                    sx={{ width: 150, marginRight: '1rem' }}
                    options={card.words} // to instead use a list of all words: {allLectureWords}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        size="small"
                        value={answers[inputFieldIndex] || ''}
                        onChange={(e) => handleInputChange(inputFieldIndex, e.target.value)}
                        error={correctness[inputFieldIndex] === false}
                        style={{ margin: '0 0.5rem', padding: '0' }}
                      />
                    )}
                    inputValue={answers[inputFieldIndex] || ''}
                    onInputChange={(event, newInputValue) => handleInputChange(inputFieldIndex, newInputValue)}
                  />
                </Box>
              )}
            </React.Fragment>
          );
        })}
      </Typography>

      {/* Navigation buttons */}
      <Box p='16px' width='100%' sx={{ position: 'fixed', bottom: '32px', right: 0, marginBottom: '4rem'}}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
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
    </Box>
  );
}
