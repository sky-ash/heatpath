// src/components/Quiz.js
import React, { useState } from 'react';
import { Typography, Button, Box, Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';

export default function Quiz({ quiz }) {
  const [selectedAnswers, setSelectedAnswers] = useState(Array(quiz.length).fill(null));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

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

  return (
    <Box>
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
            <Typography variant="h6" color="primary">
              Congratulations! You passed the quiz.
            </Typography>
          ) : (
            <Typography variant="h6" color="error">
              Unfortunately, you didn't pass. Please try again.
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
}
