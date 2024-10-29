// src/components/Quiz.js
import React, { useState, useEffect } from 'react';
import { Typography, Button, Box, Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from 'react-router-dom';

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
      setShowResult(true); // Show results after the last question
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
    <Box className="container">
      {!showResult ? ( 
      <>
        <Typography variant="h6" gutterBottom>
          
          {quiz[currentQuestion].question}

        </Typography>
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
        <Box mt={2}>
        <Button variant="contained" color="primary" onClick={handleNextQuestion}>

          {currentQuestion < quiz.length - 1 ? 'Next' : 'Submit Quiz'}
        
        </Button>
        </Box> 
      </>
      ) : (
      <Box>
        <Typography variant="h5" gutterBottom>
          Your Score: {score}%
        </Typography>

        {score >= 80 ? (
        <>
          <Typography variant="h6" color="primary" gutterBottom>
            Congratulations! You passed the quiz.
          </Typography>
        </>
        ) : (
        <>
          <Typography variant="h6" color="error" gutterBottom>
            Unfortunately, you didn't pass. Please try again.
          </Typography>
        </>
        )}
        
        <Box mt={2}>
          {quiz.map((q, index) => (
            
            <Box key={index} 
                 display="flex" 
                 alignItems="center">

              <Typography variant="body1"
                          style={{marginBottom: '0.5rem' }}>
                - {q.question}: {selectedAnswers[index]}
              </Typography>

            {selectedAnswers[index] === q.correctAnswer ? (
              <CheckCircleIcon style={{ color: 'green', marginLeft: '0.5rem' }} />
            ) : (
              <CancelIcon style={{ color: 'red', marginLeft: '0.5rem' }} />
            )}

            </Box>
          ))}
        </Box>

        {score >= 80 ? (
        <>
          <Button variant="contained" 
                  color="primary" 
                  onClick={handleReturnToPath}>
            Return to Path
          </Button>
        </>
        ) : (
        <>
          <Button variant="contained" 
                  color="primary" 
                  onClick={handleReviewCards}>
            Review Cards
          </Button>
        </>
        )}
      </Box>
    )}
  </Box>
  );
}