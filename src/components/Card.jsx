// src/components/Card.js

import React, { useState, useEffect } from 'react';

// Material-UI components
import { Box, Typography, TextField, Button, Autocomplete, Icon } from '@mui/material';
import { AppBar, Toolbar, IconButton, Fab } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// Material-UI icons
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import NavigationIcon from '@mui/icons-material/Navigation';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


// Import parsed lecture content data
import parsedLectureContent from '../data/parsedLectureContent.json';
import { TurnLeft } from '@mui/icons-material';


// Card component
export default function Card({ card, nextCard, prevCard, onCardCompletion, currentCardIndex, unlockedCards, totalCards }) {
  // State to manage answers
  const [answers, setAnswers] = useState([]);

  const navigate = useNavigate();
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

  // Function to handle navigation back to the path
  const handleReturnToPath = () => {
    navigate('/path');
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
                    options={[...new Set(card.words.flatMap(word => word.toLowerCase()))].sort()} // to instead use a list of all words: {allLectureWords}
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
      <AppBar position="fixed"
              bgcolor="background.paper"
              p={2}
              sx={{ top: 'auto', 
                    bottom: 0
                }}>
  
          <Fab color="primary"
               onClick={handleReturnToPath}
               sx={{ position: 'fixed', zIndex: 1,
                     top: 32, right: 32, }}>
            <TurnLeft />
          </Fab>

        <Toolbar>
          <IconButton color="primary" onClick={prevCard}
                      disabled={currentCardIndex === 0 && !unlockedCards.includes(totalCards - 1)}>
            <ArrowBackIosIcon />
          </IconButton>
          <Box sx={{flexGrow: 1}} />
          <IconButton color="primary" onClick={nextCard} disabled={!allCorrect}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
