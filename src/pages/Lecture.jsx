// src/pages/Lecture.js

// Import necessary components
import React, { useState } from 'react';
import { Container, Button, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

// Import the parsed lecture content from json file
import parsedLectureContent from '../data/parsedLectureContent.json';

// Import the Card and Quiz components
import Card from '../components/Card';
import Quiz from '../components/Quiz';

// The Lecture component
export default function Lecture() {
  const { id } = useParams(); // Get lecture ID from the URL
  const lecture = parsedLectureContent.lectures[id - 1];
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);

  // Show Next and Previous Cards using the currentCardIndex
  // Next Card: Go to the next card if there is one. If there is no next card, show the quiz
  
  // [[ FUTURE IMPLEMENTATION: Card-Carousel
  // Currently, if there is no next Card it shows the quiz. 
  // In the future, there will be a button to show the quiz after finishing all cards. 
  // When clicking on "Next" on the last card then, it will show the first card again. ]]
  const handleNextCard = () => {
    if (currentCardIndex < lecture.cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      setShowQuiz(true); // Show the quiz after the cards
    }
  };

  // Previous Card: Go to the previous card if there is one.
  // [[ FUTURE IMPLEMENTATION: Card-Carousel
  // Currently, if it already is at the first card, it does nothing.
  // In the future, this button should show the last card when clicking on "Previous" on the first card,
  // but only if this card is is already unlocked (if all Cards before it are completed) 
  // and otherwise the button will be locked (same as next-button behavior before putting in the right words). ]]
  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  // Render the Lecture-Page
  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        {lecture.title}
      </Typography>
      {!showQuiz ? (
        // Render the Card component (Card.jsx) with the current card (based on the currentCardIndex)
        <Card
          card={lecture.cards[currentCardIndex]}
          nextCard={handleNextCard}
          prevCard={handlePrevCard}
        />
      ) : (
        // Render the Quiz component (Quiz.jsx) after the cards
        <Quiz quiz={lecture.quiz} />
      )}
    </Container>
  );
}
