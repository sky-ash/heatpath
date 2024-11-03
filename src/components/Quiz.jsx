// src/components/Quiz.js
import React, { useState, useEffect } from 'react';

// Material-UI components
import { Typography, Button, Box, Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';

// Material-UI icons
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { Replay, TurnLeft } from '@mui/icons-material';

// React Router hook for navigation
import { useNavigate } from 'react-router-dom';

// Quiz component
export default function Quiz({ quiz, lectureId, handleReviewCards }) {
  // State to manage selected answers
  const [selectedAnswers, setSelectedAnswers] = useState(Array(quiz.length).fill(null));

  // State to manage the current question index
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // State to manage the visibility of the result
  const [showResult, setShowResult] = useState(false);

  // State to manage the score, initialized from localStorage
  const [score, setScore] = useState(() => {
    const savedScore = JSON.parse(localStorage.getItem(`quizScore-${lectureId}`));
    return savedScore || 0;
  });

  // Hook to navigate between routes
  const navigate = useNavigate();

  // Effect to save the score to localStorage and unlock the next lecture if the score is >= 80
  useEffect(() => {
    localStorage.setItem(`quizScore-${lectureId}`, JSON.stringify(score));
    if (score >= 80) {
      const unlockedLectures = JSON.parse(localStorage.getItem('unlockedLectures')) || 1;
      const nextLectureId = Math.max(unlockedLectures, parseInt(lectureId) + 1);
      localStorage.setItem('unlockedLectures', JSON.stringify(nextLectureId));
    }
  }, [score, lectureId]);

  // Function to handle answer selection
  const handleAnswerSelect = (e) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = e.target.value;
    setSelectedAnswers(newAnswers);
  };

  // Function to handle navigation to the next question or show the result
  const handleNextQuestion = () => {
    if (currentQuestion < quiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateScore();
      setShowResult(true); 
    }
  };

  // Function to calculate the score based on correct answers
  const calculateScore = () => {
    let correctAnswers = 0;
    quiz.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswer) {
        correctAnswers += 1;
      }
    });
    setScore((correctAnswers / quiz.length) * 100);
  };

  // Function to handle navigation back to the path
  const handleReturnToPath = () => {
    navigate('/path');
  };

  return (
    <Box>
      {!showResult ? ( 
      <>
        <Box display="flex" alignItems="center" textAlign="left" >
          <Box p="16px" top="16px" position="relative"> {/* left={0} position="fixed">   */}
            <img src={`${import.meta.env.BASE_URL}imgs/handup.png`} alt="Heat Path Mascot" style={{ maxWidth: '100px', height: 'auto' }} />
          </Box>
          
          {/* Display the current question */}
          <Typography variant="h6" gutterBottom mt={8} mb={4}>
            {quiz[currentQuestion].question}
          </Typography>
        </Box>
        {/* Display the options for the current question */}
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


        {/* Button to navigate to the next question or submit the quiz */}
        <Box p='16px' sx={{ position: 'fixed', bottom: 0, right: 0, marginBottom: '4rem'}}>
          <Button variant="contained" p={2} color="primary" onClick={handleNextQuestion}>
            {currentQuestion < quiz.length - 1 ? 'Next' : 'Submit Quiz'}
          </Button>
        </Box> 
      </>
      ) : (
      <Box>
        {/* Display the score */}
        <Typography variant="h6" gutterBottom mt={2}>
          Your Score: {score}%
        </Typography>


        
        {/* Display the questions and selected answers with correctness icons */}
        <Box mt={4} mb={2} className="card" p={2} boxShadow={3} borderRadius={2} bgcolor="background.paper">
          {quiz.map((q, index) => (
            <Box key={index} display="flex" alignItems="center" textAlign="left" sx={{marginBottom: '1rem', marginTop: '1rem' }}>
              {selectedAnswers[index] === q.correctAnswer ? (
                <CheckCircleIcon style={{ color: 'green', marginLeft: '1rem', marginRight: '1.5rem' }} />
              ) : (
                <CancelIcon style={{ color: 'red', marginLeft: '1rem', marginRight: '1.5rem' }} />
              )}
              <Typography variant="body1">
                {/*{q.question}: */} {selectedAnswers[index]}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Display pass/fail message based on the score */}
        {score >= 80 ? (
        <Box display="flex" alignItems="center" textAlign="left" width="80%" margin="auto">
          <Box p="16px" position="relative"> 
            <img src={`${import.meta.env.BASE_URL}imgs/success.png`} alt="Heat Path Mascot" style={{ maxWidth: '75px', height: 'auto' }} />
          </Box>
          <Typography variant="h7" color="primary" gutterBottom>
            Congratulations! You passed the quiz.
          </Typography>
        </Box>
        ) : (
        <Box display="flex" alignItems="center" textAlign="left" width="80%" margin="auto">
          <Box p="16px" position="relative"> 
            <img src={`${import.meta.env.BASE_URL}imgs/failure.png`} alt="Heat Path Mascot" style={{ maxWidth: '75px', height: 'auto' }} />
          </Box>
          <Typography variant="h7" color="error" gutterBottom>
            Unfortunately, you didn't pass. Please try again.
          </Typography>
        </Box>
        )}

        {/* Button to return to the path or review cards based on the score */}
        {score >= 80 ? (
          <Box p='16px' sx={{ position: 'fixed', bottom: 0, right: 0, marginBottom: '4rem'}}>
            <Button variant="contained" color="primary" onClick={handleReturnToPath} endIcon={<TurnLeft />}>
              Return to Path
            </Button>
          </Box>
        ) : (
          <Box p='16px' sx={{ position: 'fixed', bottom: 0, right: 0, marginBottom: '4rem'}}>
            <Button variant="contained" color="primary" onClick={handleReviewCards} endIcon={<Replay />}>
              Review Cards
            </Button>
          </Box>
        )}
      </Box>
    )}
  </Box>
  );
}