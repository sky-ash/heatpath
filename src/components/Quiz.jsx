// src/components/Quiz.js
import React, { useState, useEffect } from 'react';

// Material-UI components
import { Typography, Button, Box, Radio, RadioGroup, FormControlLabel, FormControl, Fab } from '@mui/material';

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
        <Box mb={2}
             sx={{ 
                 display: 'flex',
                 flexDirection: 'row',
                 justifyContent: 'center',
                 textAlign: 'left',
                 alignItems: 'center',
           }}>
          <Box ml={2}> {/* left={0} position="fixed">   */}
            <img src={`${import.meta.env.BASE_URL}imgs/handup.png`} alt="Heat Path Mascot" style={{ maxWidth: '100px', height: 'auto' }} />
          </Box>
          
          {/* Display the current question */}
          <Typography variant="h6" mx={2}>
            {quiz[currentQuestion].question}
          </Typography>
        </Box>

        <Box mx={4}
             sx={{ height: '100%',
                 display: 'flex',
                 flexDirection: 'row',
                 justifyContent: 'center',
                 textAlign: 'left',
                 alignItems: 'center',
           }}>          
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

        <Fab color="primary"
               variant='extended'
               onClick={handleNextQuestion}
               sx={{ position: 'fixed', zIndex: 'tooltip',
                     left: '50%', transform: 'translateX(-50%)',
                     bottom: 32, }}>
            <Typography display='flex'
                        p={2}
                        alignItems='center'
                        variant='h6'
                        fontWeight='bold'
                        >
              {currentQuestion < quiz.length - 1 ? 'Next' : 'Submit'}
            </Typography>
          </Fab>
      </>
      ) : (
      <>

        <Box mx={6}
             sx={{ 
                 display: 'flex',
                 flexDirection: 'row',
                 justifyContent: 'center',
                 textAlign: 'left',
                 alignItems: 'center',
           }}>
          <img src={`${import.meta.env.BASE_URL}imgs/${score >= 80 ? 'success' : 'failure'}.png`} alt="Heat Path Mascot" style={{ maxWidth: '75px', height: 'auto' }} />
          <Typography variant="h7" color={score >= 80 ? "primary" : "error"} mx={2}>
            {score >= 80 ? 'Congratulations! You passed the quiz.' : "Unfortunately, you didn't pass. Please try again."}
          </Typography>
        </Box>
        
        {/* Display the questions and selected answers with correctness icons */}
        <Box my={2} mx={1} className="card" p={2} boxShadow={3} borderRadius={2} bgcolor="background.paper">
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

        <Typography variant="h6">
          Your Score: {score.toFixed(2)}%
        </Typography>
        


        {/* Button to return to the path or review cards based on the score */}
        {score >= 80 ? (
          <Fab color="primary"
               variant='extended'
               onClick={handleReturnToPath}
               sx={{ position: 'fixed', zIndex: 'tooltip',
                     left: '50%', transform: 'translateX(-50%)',
                     bottom: 32, }}>
            <Typography display='flex'
                        p={2}
                        alignItems='center'
                        variant='h6'
                        fontWeight='bold'
                        >
              <TurnLeft sx={{mr: 1}} />
              to Path
            </Typography>
          </Fab>        
        ) : (
          <Fab color="primary"
               variant='extended'
               onClick={handleReviewCards}
               sx={{ position: 'fixed', zIndex: 'tooltip',
                     left: '50%', transform: 'translateX(-50%)',
                     bottom: 32, }}>
            <Typography display='flex'
                        p={2}
                        alignItems='center'
                        variant='h6'
                        fontWeight='bold'
                        >
              <Replay sx={{mr: 1}} />
              Review
            </Typography>
          </Fab>
        )}
      </>
    )}
  </Box>
  );
}