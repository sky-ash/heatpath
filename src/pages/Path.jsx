// src/pages/Path.js
import React, { useState } from 'react';
import { Container, Card, CardContent, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import parsedLectureContent from '../data/parsedLectureContent.json';

export default function Path() {
  const [unlockedLectures, setUnlockedLectures] = useState([1]); // Initially, only Lecture 1 is unlocked
  const navigate = useNavigate();

  const handleLectureClick = (id) => {
    if (unlockedLectures.includes(id)) {
      navigate(`/lecture/${id}`); // Redirect to the lecture page
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Learning Path
      </Typography>
      {parsedLectureContent.lectures.map((lecture, index) => (
        <Card key={index} style={{ margin: '1rem 0' }}>
          <CardContent>
            <Typography variant="h6">{lecture.title}</Typography>
            <Button
              variant="contained"
              color="primary"
              disabled={!unlockedLectures.includes(index + 1)}
              onClick={() => handleLectureClick(index + 1)}
            >
              {unlockedLectures.includes(index + 1) ? 'Start Lecture' : 'Locked'}
            </Button>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}
