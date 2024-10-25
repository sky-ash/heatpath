// src/components/LearningCard.js
import React, { useState, useEffect } from 'react';
import { Typography, Chip, Button, Box } from '@mui/material';

export default function LearningCard({ card, nextCard, prevCard }) {
  const [answers, setAnswers] = useState([]);
  const [draggedWord, setDraggedWord] = useState(null);

  // Initialize answers with an empty array based on the number of words in the card
  useEffect(() => {
    const initialAnswers = Array(card.words.length).fill(null);
    setAnswers(initialAnswers);
  }, [card.words.length]);

  // Track the word that is currently being dragged
  const handleDragStart = (word) => {
    setDraggedWord(word);
  };

  // Handle dropping the word into the drop zone
  const handleDrop = (index) => {
    if (draggedWord) {
      const newAnswers = [...answers];
      newAnswers[index] = draggedWord;
      setAnswers(newAnswers);
      setDraggedWord(null); // Reset after dropping
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Allow the drop action
  };

  // Allow removing a word from a drop zone to retry
  const handleRemoveWord = (index) => {
    const newAnswers = [...answers];
    newAnswers[index] = null;
    setAnswers(newAnswers);
  };

  // Check if the placed word is correct
  const checkCorrectness = (answer, correctWord) => {
    if (!answer) return 'default';
    return answer === correctWord ? 'success' : 'error';
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {card.title}
      </Typography>

      {/* Render the sentence with drop zones */}
      <Typography variant="body1" component="div" style={{ marginBottom: '1rem' }}>
        {card.sentence.map((part, index) => {
          const isDropZone = part === '___';
          const wordIndex = isDropZone
            ? answers.findIndex((_, i) => answers[i] === null)
            : null;

          return (
            <React.Fragment key={index}>
              {/* Render sentence part */}
              {!isDropZone && part}

              {/* Render drop zone for missing words */}
              {isDropZone && (
                <Chip
                  label={answers[wordIndex] || '____'}
                  onDrop={() => handleDrop(wordIndex)}
                  onDragOver={handleDragOver}
                  color={
                    checkCorrectness(answers[wordIndex], card.words[wordIndex]) === 'success'
                      ? 'success'
                      : 'error'
                  }
                  style={{
                    margin: '0 0.5rem',
                    backgroundColor: answers[wordIndex]
                      ? checkCorrectness(answers[wordIndex], card.words[wordIndex]) === 'success'
                        ? 'lightgreen'
                        : 'lightcoral'
                      : 'lightgray',
                  }}
                  draggable={false}
                  onClick={() => handleRemoveWord(wordIndex)} // Allow retrying
                />
              )}
            </React.Fragment>
          );
        })}
      </Typography>

      {/* Available words to drag */}
      <Box>
        {card.words.map((word, i) => (
          <Chip
            key={i}
            label={word}
            draggable
            onDragStart={() => handleDragStart(word)}
            color="primary"
            style={{ margin: '0.5rem' }}
          />
        ))}
      </Box>

      {/* Navigation buttons */}
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
