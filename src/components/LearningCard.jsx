// src/components/LearningCard.js
import React, { useState, useEffect } from 'react';
import { Typography, Chip, Button, Box } from '@mui/material';
import { useDrag, useDrop } from 'react-dnd';

const ItemTypes = {
  WORD: 'word',
};

function DraggableWord({ word }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.WORD,
    item: { word },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <Chip
      ref={drag}
      label={word}
      color="primary"
      style={{ margin: '0.5rem', opacity: isDragging ? 0.5 : 1 }}
    />
  );
}

function DropZone({ index, acceptWord, currentWord }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.WORD,
    drop: (item) => acceptWord(index, item.word),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <Chip
      ref={drop}
      label={currentWord || '____'}
      style={{
        margin: '0 0.5rem',
        backgroundColor: isOver ? 'lightblue' : 'lightgray',
      }}
    />
  );
}

export default function LearningCard({ card, nextCard, prevCard }) {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const initialAnswers = Array(card.words.length).fill(null);
    setAnswers(initialAnswers);
  }, [card.words.length]);

  const acceptWord = (index, word) => {
    const newAnswers = [...answers];
    newAnswers[index] = word;
    setAnswers(newAnswers);
  };

  const checkCorrectness = (answer, correctWord) => {
    if (!answer) return 'default';
    return answer === correctWord ? 'success' : 'error';
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {card.title}
      </Typography>

      <Typography variant="body1" component="div" style={{ marginBottom: '1rem' }}>
        {card.sentence.map((part, index) => {
          const isDropZone = part === '___';
          const wordIndex = isDropZone
            ? answers.findIndex((_, i) => answers[i] === null)
            : null;

          return (
            <React.Fragment key={index}>
              {!isDropZone && part}
              {isDropZone && (
                <DropZone
                  index={wordIndex}
                  acceptWord={acceptWord}
                  currentWord={answers[wordIndex]}
                />
              )}
            </React.Fragment>
          );
        })}
      </Typography>

      <Box>
        {card.words.map((word, i) => (
          <DraggableWord key={i} word={word} />
        ))}
      </Box>

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