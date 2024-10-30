// src/pages/Path.js

// Import necessary components
import React, { useState, useEffect } from 'react';
import { Container, Card, CardContent, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import Navigation from '../components/Navigation';

// Import the parsed lecture content from json file
import parsedLectureContent from '../data/parsedLectureContent.json';

// The Path component
export default function Path() {

  // State to keep track of unlocked lectures
  const [unlockedLectures, setUnlockedLectures] = useState(1);

  useEffect(() => {
    const storedUnlockedLectures = JSON.parse(localStorage.getItem('unlockedLectures'));
    if (storedUnlockedLectures) {
      setUnlockedLectures(storedUnlockedLectures);
    } else {
      localStorage.setItem('unlockedLectures', JSON.stringify(1));
    }
  }, []);

  // useNavigate-hook from React to navigate on Button-Click
  const navigate = useNavigate();
  const handleLectureClick = (id) => {
    // Only navigate to the lecture if it is unlocked (otherwise Button won't be clickable)
    if (id <= unlockedLectures) {
      navigate(`/lecture/${id}`); // Redirect to the lecture page
    }
  };

  // Render the Path-Page
  return (
    <Container className="container"
               sx={{ textAlign: 'center',
                     justifyContent: 'space-evenly', // 'space-between', 'space-around'
                  }}>

      <Typography variant="h4" gutterBottom>
        Learning Path
      </Typography>

      {/* Map over the lectures and render a Card for each */}
      {parsedLectureContent.lectures.map((lecture, index) => (
        <Card key={index} className="card">
          <CardContent>

            <Typography variant="h6">
              {lecture.title}
            </Typography>

            <Button variant="contained"
                    color="primary"
                    disabled={index + 1 > unlockedLectures}
                    onClick={() => handleLectureClick(index + 1)}>
              {index + 1 <= unlockedLectures ? 'Start Lecture' : 'Locked'}
            </Button>

          </CardContent>
        </Card>
      ))}

      <Navigation />
    </Container>
  );
}