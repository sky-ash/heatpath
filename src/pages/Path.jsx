import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Popover, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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

      <Box sx={{ position: 'relative', height: '400px', width: '100%', border: '0px solid #ccc' }}>
        {parsedLectureContent.lectures.map((lecture, index) => (
          <Button
            key={index}
            className="button-3d"
            variant='contained'
            color='primary'
            disabled={index + 1 > unlockedLectures}
            sx={{
              position: 'absolute',
              top: `${(index + 1) * 20}%`,
              left: `${(index + 1) * 20}%`,
              //width: '50px',
              //height: '50px',
              //backgroundColor: index + 1 <= unlockedLectures ? 'var(--colorShadeA)' : '',
              //cursor: index + 1 <= unlockedLectures ? 'pointer' : 'default',
              transform: 'perspective(800px) rotateY(10deg) rotateX(40deg) rotateZ(-15deg)',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
            }}
            onClick={(event) => {
              if (index + 1 <= unlockedLectures) {
                handlePopoverOpen(event, lecture);
                handleButtonClick(index);
              }
            }}
          >
            <Typography variant="h6" sx={{ color: 'white', lineHeight: '50px' }}>
              {index + 1}
            </Typography>
          </Button>
        ))}

        <Sprite />
      </Box>

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
