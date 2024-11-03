// src/pages/Lecture.js

// Import necessary components
import React, { useState, useEffect } from 'react';
import { Container, Button, Typography, Box, LinearProgress } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

// Import the parsed lecture content from json file
import parsedLectureContent from '../data/parsedLectureContent.json';

// Import the Card and Quiz components
import Card from '../components/Card';
import Quiz from '../components/Quiz';
import Navigation from '../components/Navigation';
import InfoButton from '../components/InfoButton';


// The Lecture component
export default function Lecture() {
  const { id } = useParams(); // Get lecture ID from the URL
  const lecture = parsedLectureContent.lectures[id - 1];
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [viewedCards, setViewedCards] = useState(() => {
    const savedViewedCards = JSON.parse(localStorage.getItem(`viewedCards-${id}`));
    return savedViewedCards || Array(lecture.cards.length).fill(false);
  });
  const [unlockedCards, setUnlockedCards] = useState(() => {
    const savedUnlockedCards = JSON.parse(localStorage.getItem(`unlockedCards-${id}`));
    return savedUnlockedCards || [0]; // Initially, only the first card is unlocked
  });
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

  useEffect(() => {
    localStorage.setItem(`viewedCards-${id}`, JSON.stringify(viewedCards));
  }, [viewedCards, id]);

  useEffect(() => {
    localStorage.setItem(`unlockedCards-${id}`, JSON.stringify(unlockedCards));
  }, [unlockedCards, id]);

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

  const handleReviewCards = () => {
    setCurrentCardIndex(0);
    setShowQuiz(false);
  };

  const completedCards = viewedCards.filter(viewed => viewed).length;
  const progress = (completedCards / lecture.cards.length) * 100;

  return (
    <Container className="container"
               sx={{ textAlign: 'center',
                     justifyContent: 'flex-start', // 'space-between', 'space-around'
                  }}
                  >

      <Typography variant="h4" gutterBottom mt={8}>
        {lecture.title.split(':')[0]}
      </Typography>

      {!showQuiz ? (
        <Box mt={8}>
          <LinearProgress variant="determinate" value={progress} sx={{ marginBottom: '16px' }} />
          <Card
            card={lecture.cards[currentCardIndex]}
            nextCard={handleNextCard}
            prevCard={handlePrevCard}
            onCardCompletion={() => handleCardCompletion(currentCardIndex)}
            currentCardIndex={currentCardIndex}
            unlockedCards={unlockedCards}
            totalCards={lecture.cards.length}
            parsedLectureContent={parsedLectureContent}
          />
        <Box p='16px' sx={{ position: 'fixed', bottom: 0, right: 0, marginBottom: '4rem'}}>
        <Button
              variant="contained"
              color="primary"
              onClick={handleStartQuiz}
              disabled={!allCorrect}>
              Start Quiz
            </Button>
          </Box>
        </Box>
      ) : (
        <Quiz quiz={lecture.quiz} 
              lectureId={id} 
              handleReviewCards={handleReviewCards} />
      )}

      <InfoButton />
      <Navigation />
    </Container>
  );
}