import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Popover, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AwesomeButton } from "react-awesome-button";

import Navigation from '../components/Navigation';
import Sprite, { moveSprite } from '../components/Sprite';
import parsedLectureContent from '../data/parsedLectureContent.json';

export default function Path() {
  const [unlockedLectures, setUnlockedLectures] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedLecture, setSelectedLecture] = useState(null);

  useEffect(() => {
    const storedUnlockedLectures = JSON.parse(localStorage.getItem('unlockedLectures'));
    if (storedUnlockedLectures) {
      setUnlockedLectures(storedUnlockedLectures);
    } else {
      localStorage.setItem('unlockedLectures', JSON.stringify(1));
    }
  }, []);

  const navigate = useNavigate();
  const handleLectureClick = (id) => {
    if (id <= unlockedLectures) {
      navigate(`/lecture/${id}`);
    }
  };

  const handlePopoverOpen = (event, lecture) => {
    setAnchorEl(event.currentTarget);
    setSelectedLecture(lecture);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setSelectedLecture(null);
  };

  const handleButtonClick = (index) => {
    const buttonPosition = {
      x: (index + 1) * 20,
      y: (index + 1) * 20,
    };
    moveSprite(buttonPosition.x, buttonPosition.y);
  };

  const open = Boolean(anchorEl);

  return (
    <Container className="container" sx={{ textAlign: 'center', justifyContent: 'space-evenly' }}>
      <Typography variant="h4" gutterBottom>
        Learning Path
      </Typography>

      {parsedLectureContent.lectures.map((lecture, index) => (
        <div key={index} className="lecture-button">
          <AwesomeButton
            type="primary"
            disabled={index + 1 > unlockedLectures}
            onClick={(event) => handlePopoverOpen(event, lecture)}
          >
            {index + 1}
          </AwesomeButton>
        </div>
      ))}

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div style={{ padding: '16px', textAlign: 'center' }}>
          <Typography variant="h6">{selectedLecture?.title}</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleLectureClick(parsedLectureContent.lectures.indexOf(selectedLecture) + 1);
              handlePopoverClose();
            }}
          >
            Start Lecture
          </Button>
        </div>
      </Popover>

      <Navigation />
    </Container>
  );
}
