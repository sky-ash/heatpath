// src/pages/Lecture.js

// Import necessary components
import React, { useState, useEffect } from 'react';
import { Container, Button, Typography, Box } from '@mui/material';
import { useParams } from 'react-router-dom';

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
  const [viewedCards, setViewedCards] = useState(Array(lecture.cards.length).fill(false));
  const [unlockedCards, setUnlockedCards] = useState([0]); // Initially, only the first card is unlocked
  const [allCorrect, setAllCorrect] = useState(false);

  useEffect(() => {
    // Check if all cards have been viewed and all words are correct
    const allViewed = viewedCards.every(viewed => viewed);
    const allWordsCorrect = viewedCards.every((viewed, index) => {
      const card = lecture.cards[index];
      const savedAnswers = JSON.parse(localStorage.getItem(`answers-${card.sentence.join(' ')}`)) || [];
      return savedAnswers.every((answer, i) => answer === card.words[i]);
    });
    setAllCorrect(allViewed && allWordsCorrect);
  }, [viewedCards, lecture.cards]);

  const handleNextCard = () => {
    const nextIndex = (currentCardIndex + 1) % lecture.cards.length;
    if (unlockedCards.includes(nextIndex) || currentCardIndex === lecture.cards.length - 1) {
      setCurrentCardIndex(nextIndex);
      const newViewedCards = [...viewedCards];
      newViewedCards[nextIndex] = true;
      setViewedCards(newViewedCards);
    }
  };

  const handlePrevCard = () => {
    const prevIndex = (currentCardIndex - 1 + lecture.cards.length) % lecture.cards.length;
    if (currentCardIndex === 0 && !unlockedCards.includes(lecture.cards.length - 1)) {
      return; // Lock the previous button on the first card if the last card is not unlocked
    }
    setCurrentCardIndex(prevIndex);
  };

  const handleCardCompletion = (index) => {
    if (!unlockedCards.includes(index + 1) && index < lecture.cards.length - 1) {
      setUnlockedCards([...unlockedCards, index + 1]);
    }
  };

  const handleStartQuiz = () => {
    setShowQuiz(true);
  };

  // Render the Lecture-Page
  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        {lecture.title}
      </Typography>
      {!showQuiz ? (
        <>
          <Card
            card={lecture.cards[currentCardIndex]}
            nextCard={handleNextCard}
            prevCard={handlePrevCard}
            onCardCompletion={() => handleCardCompletion(currentCardIndex)}
          />
          <Box mt={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleStartQuiz}
              disabled={!allCorrect}
            >
              Start Quiz
            </Button>
          </Box>
        </>
      ) : (
        <Quiz quiz={lecture.quiz} />
      )}
    </Container>
  );
}