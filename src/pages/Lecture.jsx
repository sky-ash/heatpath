// src/pages/Lecture.js
import React, { useState } from 'react';
import { Container, Button, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import parsedLectureContent from '../data/parsedLectureContent.json';
import LearningCard from '../components/LearningCard';
import Quiz from '../components/Quiz';

export default function Lecture() {
  const { id } = useParams(); // Get lecture ID from the URL
  const lecture = parsedLectureContent.lectures[id - 1];
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);

  const handleNextCard = () => {
    if (currentCardIndex < lecture.cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      setShowQuiz(true); // Show the quiz after the cards
    }
  };

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        {lecture.title}
      </Typography>
      {!showQuiz ? (
        <LearningCard
          card={lecture.cards[currentCardIndex]}
          nextCard={handleNextCard}
          prevCard={handlePrevCard}
        />
      ) : (
        <Quiz quiz={lecture.quiz} />
      )}
    </Container>
  );
}
