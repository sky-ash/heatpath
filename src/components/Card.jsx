// src/components/Card.js

import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, TextField, Button, Autocomplete, InputAdornment } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

import parsedLectureContent from '../data/parsedLectureContent.json';


export default function Card({ card, nextCard, prevCard, onCardCompletion, currentCardIndex, unlockedCards, totalCards }) {

  const [answers, setAnswers] = useState([]);
  const [correctness, setCorrectness] = useState([]);
  const inputRefs = useRef([]);

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
    newCorrectness[index] = value.toLowerCase() === card.words[index].toLowerCase();
    setCorrectness(newCorrectness);

    localStorage.setItem(`answers-${card.sentence.join(' ')}`, JSON.stringify(newAnswers));

    // Check if all answers are correct and call onCardCompletion
    if (newCorrectness.every(c => c === true)) {
      onCardCompletion();
    }

    //adjustWidth(index);
  };

  /*
  const adjustWidth = (index) => {
    const input = inputRefs.current[index];
    if (input) {
      input.style.width = `${input.scrollWidth}px`;
    }
  };

  useEffect(() => {
    answers.forEach((_, index) => adjustWidth(index));
  }, [answers]);
  */

  const allCorrect = correctness.every(c => c === true);
  const allLectureWords = [...new Set(parsedLectureContent.lectures.flatMap(lecture => lecture.cards.flatMap(card => card.words.map(word => word.toLowerCase()))))].sort();

  return (
    <Box className="card" p={2} boxShadow={3} borderRadius={2} bgcolor="background.paper">
      <Typography variant="h6" gutterBottom>
        {card.title}
      </Typography>

      <Typography variant="body1" align="center" component="div" style={{ marginBottom: '1rem', lineHeight: 2.5 }}>
        {card.sentence.map((part, index) => {
          const isInputField = part === '___';
          const inputFieldIndex = card.sentence.slice(0, index).filter(p => p === '___').length;

            return (
            <React.Fragment key={index}>
              {!isInputField && part}
              {isInputField && (
              <Box key={index}
                   display="inline-flex" 
                   alignItems="center" 
                   sx={{ verticalAlign: 'middle' }}
                   >

                {correctness[inputFieldIndex] === true && <CheckCircleIcon style={{ color: 'green', marginLeft: '0.75rem' }} />}
                {correctness[inputFieldIndex] === false && <CancelIcon style={{ color: 'red', marginLeft: '0.75rem' }} />}

                <Autocomplete
                freeSolo
                disableClearable
                sx={{ /*  minWidth: 80, maxWidth: 200,  */ width: 150, marginRight: '1rem' }}
                options={allLectureWords} // {allLectureWords}, {card.words} or: (only the words of the current card) 
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField
                  {...params}
                  variant="outlined"
                  size="small"
                  //label="Enter missing word"
                  value={answers[inputFieldIndex] || ''}
                  onChange={(e) => handleInputChange(inputFieldIndex, e.target.value)}
                  error={correctness[inputFieldIndex] === false}
                  style={{ margin: '0 0.5rem', padding: '0' }}

                  /*
                  inputRef={(el) => (inputRefs.current[inputFieldIndex] = el)}
                  onInput={(e) => adjustWidth(inputFieldIndex)}
                  */
                  />
                )}
                inputValue={answers[inputFieldIndex] || ''}
                onInputChange={(event, newInputValue) => handleInputChange(inputFieldIndex, newInputValue)}
                />

                {/*
                {correctness[inputFieldIndex] === true && <CheckCircleIcon style={{ color: 'green', marginRight: '0.75rem' }} />}
                {correctness[inputFieldIndex] === false && <CancelIcon style={{ color: 'red', marginRight: '0.75rem' }} />}
                */}

              </Box>
              )}
            </React.Fragment>
            );
        })}
      </Typography>

      {/*
      <Typography variant="body2" style={{ marginBottom: '1rem' }}>
        Fill out the following words in the empty fields: {card.words.join(', ')}
      </Typography>
      */}

      <Box display="flex" justifyContent="space-between" alignItems="center">
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
