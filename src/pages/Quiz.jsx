// src/pages/Quiz.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box, Chip } from '@mui/material';
import parsedLectureContent from '../data/parsedLectureContent.json';

// Quiz Page Component
export default function Quiz() {
  const { id } = useParams(); // Get the lecture ID from the URL params
  const navigate = useNavigate(); // Navigate back to the path page
  const lectureData = parsedLectureContent.lectures.find((lecture) => lecture.title === `Lecture ${id}`);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    if (option === lectureData.quiz[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < lectureData.quiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    } else {
      setShowResult(true);
    }
  };

  const handleFinishQuiz = () => {
    const resultPercentage = (score / lectureData.quiz.length) * 100;
    if (resultPercentage >= 80) {
      alert("Congratulations! You've passed the quiz.");
      // Here you might want to implement logic to unlock the next lecture
    } else {
      alert("Unfortunately, you didn't pass. Try reviewing the lecture and retaking the quiz.");
    }
    navigate('/path'); // Redirect back to the learning path
  };

  if (!lectureData) {
    return <Typography variant="h6">Lecture data not found.</Typography>;
  }

  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>Quiz for {lectureData.title}</Typography>

      {!showResult ? (
        <>
          <Typography variant="h6" style={{ marginTop: '1rem' }}>
            {lectureData.quiz[currentQuestion].question}
          </Typography>
          <Box style={{ marginTop: '1rem' }}>
            {lectureData.quiz[currentQuestion].options.map((option, index) => (
              <Chip
                key={index}
                label={option}
                color={selectedOption === option ? (option === lectureData.quiz[currentQuestion].correctAnswer ? 'success' : 'error') : 'default'}
                onClick={() => handleOptionSelect(option)}
                style={{ margin: '0.5rem' }}
              />
            ))}
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNextQuestion}
            style={{ marginTop: '2rem' }}
            disabled={!selectedOption}
          >
            {currentQuestion < lectureData.quiz.length - 1 ? 'Next' : 'Finish Quiz'}
          </Button>
        </>
      ) : (
        <Box style={{ marginTop: '2rem' }}>
          <Typography variant="h5">Quiz Completed!</Typography>
          <Typography variant="h6">Your Score: {((score / lectureData.quiz.length) * 100).toFixed(2)}%</Typography>
          <Button variant="contained" color="primary" onClick={handleFinishQuiz} style={{ marginTop: '1rem' }}>
            Go to Learning Path
          </Button>
        </Box>
      )}
    </Container>
  );
}
