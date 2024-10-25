// src/pages/Path.js

// Import necessary components
import React, { useState } from 'react';
import { Container, Card, CardContent, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Import the parsed lecture content from json file
import parsedLectureContent from '../data/parsedLectureContent.json';

// The Path component
export default function Path() {

  // State to keep track of unlocked lectures
  const unlockedLectures = localStorage.getItem('unlockedLectures') ? JSON.parse(localStorage.getItem('unlockedLectures')) : [1];

  // useNavigate-hook from React to navigate on Button-Click
  const navigate = useNavigate();
  const handleLectureClick = (id) => {
    // Only navigate to the lecture if it is unlocked (otherwise Button won't be clickable)
    if (unlockedLectures.includes(id)) {
      navigate(`/lecture/${id}`); // Redirect to the lecture page
    }
  };

  // Render the Path-Page
  return (

    // MUI Container Component for Styling
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>

      {/* Heading */}
      <Typography variant="h4" gutterBottom>
        Learning Path
      </Typography>

      {/* Map over the lectures and render a Card for each */}
      {parsedLectureContent.lectures.map((lecture, index) => (
        <Card key={index} style={{ margin: '1rem 0' }}>
          <CardContent>

            {/* Lecture Title */}
            <Typography variant="h6">{lecture.title}</Typography>

            {/* MUI Button Component (+ logic) to navigate to the lecture */}
            <Button
              variant="contained"
              color="primary"
              disabled={!unlockedLectures.includes(index + 1)}
              onClick={() => handleLectureClick(index + 1)}
            >
              {/* If the lecture is unlocked, show "Start Lecture", otherwise "Locked" */}
              {unlockedLectures.includes(index + 1) ? 'Start Lecture' : 'Locked'}
            </Button>

          </CardContent>
        </Card>
      ))}
    </Container>
  );
}
