// src/pages/Lecture.js

// Import necessary components
import React, { useState, useEffect } from 'react';
import { Button, Typography, Box, LinearProgress, Fab, IconButton, AppBar, Toolbar, Link } from '@mui/material';
import { useParams } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import NavigationIcon from '@mui/icons-material/Navigation';

// Import the parsed lecture content from json file
import parsedLectureContent from '../data/parsedLectureContent.json';

// Import the Card and Quiz components
import Card from '../components/Card';
import Quiz from '../components/Quiz';
import Navigation from '../components/Navigation';

// The Lecture component
export default function Lecture() {
  // Get lecture ID from the URL
  const { id } = useParams();
  const navigate = useNavigate();

  // Get the lecture data based on the ID
  const lecture = parsedLectureContent.lectures[id - 1];

  // State to keep track of the current card index
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  // State to determine whether to show the quiz
  const [showQuiz, setShowQuiz] = useState(false);

  // State to keep track of viewed cards
  const [viewedCards, setViewedCards] = useState(() => {
    const savedViewedCards = JSON.parse(localStorage.getItem(`viewedCards-${id}`));
    return savedViewedCards || Array(lecture.cards.length).fill(false);
  });

  // State to keep track of unlocked cards
  const [unlockedCards, setUnlockedCards] = useState(() => {
    const savedUnlockedCards = JSON.parse(localStorage.getItem(`unlockedCards-${id}`));
    return savedUnlockedCards || [0]; // Initially, only the first card is unlocked
  });

  // State to check if all cards are correct
  const [allCorrect, setAllCorrect] = useState(false);

  // useEffect to check if all cards are viewed and correct
  useEffect(() => {
    const allViewed = viewedCards.every(viewed => viewed);
    const allWordsCorrect = viewedCards.every((viewed, index) => {
      const card = lecture.cards[index];
      const savedAnswers = JSON.parse(localStorage.getItem(`answers-${card.sentence.join(' ')}`)) || [];
      return savedAnswers.every((answer, i) => answer.toLowerCase() === card.words[i].toLowerCase());
    });
    setAllCorrect(allViewed && allWordsCorrect);
  }, [viewedCards, lecture.cards]);

  // useEffect to save viewed cards to localStorage
  useEffect(() => {
    localStorage.setItem(`viewedCards-${id}`, JSON.stringify(viewedCards));
  }, [viewedCards, id]);

  // useEffect to save unlocked cards to localStorage
  useEffect(() => {
    localStorage.setItem(`unlockedCards-${id}`, JSON.stringify(unlockedCards));
  }, [unlockedCards, id]);

  // Function to handle moving to the next card
  const handleNextCard = () => {
    const nextIndex = (currentCardIndex + 1) % lecture.cards.length;
    if (unlockedCards.includes(nextIndex) || currentCardIndex === lecture.cards.length - 1) {
      setCurrentCardIndex(nextIndex);
      const newViewedCards = [...viewedCards];
      newViewedCards[nextIndex] = true;
      setViewedCards(newViewedCards);
    }
  };

  // Function to handle moving to the previous card
  const handlePrevCard = () => {
    const prevIndex = (currentCardIndex - 1 + lecture.cards.length) % lecture.cards.length;
    if (currentCardIndex === 0 && !unlockedCards.includes(lecture.cards.length - 1)) {
      return; // Lock the previous button on the first card if the last card is not unlocked
    }
    setCurrentCardIndex(prevIndex);
  };

  // Function to handle card completion
  const handleCardCompletion = (index) => {
    if (!unlockedCards.includes(index + 1) && index < lecture.cards.length - 1) {
      setUnlockedCards([...unlockedCards, index + 1]);
    }
  };

  // Function to start the quiz
  const handleStartQuiz = () => {
    setShowQuiz(true);
  };

  // Function to review cards
  const handleReviewCards = () => {
    setCurrentCardIndex(0);
    setShowQuiz(false);
  };

  // Calculate the progress of viewed cards
  const completedCards = viewedCards.filter(viewed => viewed).length;
  const progress = (completedCards / lecture.cards.length) * 100;

  return (
    <>
      <Typography variant="h3" gutterBottom mt={8} mb={8}>
        {lecture.title.split(':')[0]}
      </Typography>

      {!showQuiz ? (
        <Box>
          {/* Progress bar */}
          <LinearProgress variant="determinate" value={progress} sx={{ marginBottom: '16px' }} />
          {/* Card component */}
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
          {/*
          <Box p="16px" sx={{ position: 'fixed', bottom: 0, right: 0, marginBottom: '4rem' }}>
            <Button variant="contained" color="primary" onClick={handleStartQuiz} disabled={!allCorrect}>
              Start Quiz
            </Button>
          </Box>
          */}
        
          <Fab color="primary"
          variant='extended'
          onClick={handleStartQuiz}
          disabled={!allCorrect}
          sx={{ position: 'fixed', zIndex: 1,
                left: '50%', transform: 'translateX(-50%)',
                bottom: 32, }}>
       <Typography display='flex'
                   p={2}
                   alignItems='center'
                   variant='h6'
                   fontWeight='bold'
                   >
         Start Quiz
       </Typography>
     </Fab>   

     </Box>
      ) : (
        // Quiz component
        <Quiz quiz={lecture.quiz} lectureId={id} handleReviewCards={handleReviewCards} />
      )}
    </>
  );
}