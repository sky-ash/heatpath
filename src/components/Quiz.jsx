// src/components/Quiz.js
import React, { useState, useEffect } from 'react';
import { Typography, Button, Box, Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from 'react-router-dom';
import { Replay, TurnLeft } from '@mui/icons-material';

export default function Quiz({ quiz, lectureId, handleReviewCards }) {
  const [selectedAnswers, setSelectedAnswers] = useState(Array(quiz.length).fill(null));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(() => {
    const savedScore = JSON.parse(localStorage.getItem(`quizScore-${lectureId}`));
    return savedScore || 0;
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem(`quizScore-${lectureId}`, JSON.stringify(score));
    if (score >= 80) {
      const unlockedLectures = JSON.parse(localStorage.getItem('unlockedLectures')) || 1;
      const nextLectureId = Math.max(unlockedLectures, parseInt(lectureId) + 1);
      localStorage.setItem('unlockedLectures', JSON.stringify(nextLectureId));
    }
  }, [score, lectureId]);

  const handleAnswerSelect = (e) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = e.target.value;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateScore();
      setShowResult(true); 
    }
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    quiz.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswer) {
        correctAnswers += 1;
      }
    });
    setScore((correctAnswers / quiz.length) * 100);
  };

  const handleReturnToPath = () => {
    navigate('/path');
  };

  return (
    <Box>
      {!showResult ? ( 
      <>
        <Typography variant="h6" gutterBottom mt={8} mb={4}>
          
          {quiz[currentQuestion].question}

        </Typography>

        <Box textAlign="left">
        <FormControl component="fieldset">
        <RadioGroup value={selectedAnswers[currentQuestion] || ''} onChange={handleAnswerSelect}>

          {quiz[currentQuestion].options.map((option, i) => (
              <FormControlLabel
                key={i}
                value={option}
                control={<Radio />}
                label={option}
              />
            ))}

        </RadioGroup>
        </FormControl>
        </Box>

        <Box p='16px' sx={{ position: 'fixed', bottom: 0, right: 0, marginBottom: '4rem'}}>
        <Button variant="contained" p={2}
                color="primary" 
                onClick={handleNextQuestion}>

          {currentQuestion < quiz.length - 1 ? 'Next' : 'Submit Quiz'}
        
        </Button>
        </Box> 
      </>
      ) : (
      <Box>
        <Typography variant="h6" gutterBottom>
          Your Score: {score}%
        </Typography>

        {score >= 80 ? (
        <Typography variant="subtitle2" color="primary" gutterBottom>
          Congratulations! You passed the quiz.
        </Typography>
        ) : (
        <Typography variant="subtitle2" color="error" gutterBottom>
          Unfortunately, you didn't pass. Please try again.
        </Typography>
        )}
        
        <Box mt={2} className="card" p={2} boxShadow={3} borderRadius={2} bgcolor="background.paper">
          {quiz.map((q, index) => (
            
            <Box key={index} 
                 display="flex" 
                 alignItems="center"
                 textAlign="left"
                 sx={{marginBottom: '1rem', marginTop: '1rem' }}>

            {selectedAnswers[index] === q.correctAnswer ? (
              <CheckCircleIcon style={{ color: 'green', marginLeft: '1rem', marginRight: '1.5rem' }} />
            ) : (
              <CancelIcon style={{ color: 'red', marginLeft: '1rem', marginRight: '1.5rem' }} />
            )}

              <Typography variant="body1">
                {q.question}: {selectedAnswers[index]}
              </Typography>

            </Box>
          ))}
        </Box>

        {score >= 80 ? (
                  <Box p='16px' sx={{ position: 'fixed', bottom: 0, right: 0, marginBottom: '4rem'}}>

        <Button variant="contained" 
                color="primary" 
                onClick={handleReturnToPath}
                endIcon={<TurnLeft />}>
          Return to Path
        </Button>
        </Box>

        ) : (
          <Box p='16px' sx={{ position: 'fixed', bottom: 0, right: 0, marginBottom: '4rem'}}>

        <Button variant="contained" 
                color="primary" 
                onClick={handleReviewCards}
                endIcon={<Replay />}>
          Review Cards
        </Button>
        </Box>

        )}

      </Box>
    )}
  </Box>
  );
}