import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Popover, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import Navigation from '../components/Navigation';
import parsedLectureContent from '../data/parsedLectureContent.json';

export default function Path() {
  const [unlockedLectures, setUnlockedLectures] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [spritePosition, setSpritePosition] = useState({ x: 0, y: 0 });

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

  const open = Boolean(anchorEl);

  const moveSprite = (x, y) => {
    setSpritePosition({ x, y });
  };

  return (
    <Container className="container" sx={{ textAlign: 'center', justifyContent: 'space-evenly' }}>
      <Typography variant="h4" gutterBottom>
        Learning Path
      </Typography>

      <Box sx={{ position: 'relative', height: '400px', width: '100%', border: '1px solid #ccc' }}>
        {parsedLectureContent.lectures.map((lecture, index) => (
          <Box
            key={index}
            sx={{
              position: 'absolute',
              top: `${(index + 1) * 20}%`,
              left: `${(index + 1) * 20}%`,
              width: '50px',
              height: '50px',
              backgroundColor: index + 1 <= unlockedLectures ? 'blue' : 'grey',
              transform: 'rotateY(45deg) rotateX(45deg)',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              cursor: index + 1 <= unlockedLectures ? 'pointer' : 'default',
            }}
            onClick={(event) => {
              if (index + 1 <= unlockedLectures) {
                handlePopoverOpen(event, lecture);
                moveSprite((index + 1) * 20, (index + 1) * 20);
              }
            }}
          >
            <Typography variant="h6" sx={{ color: 'white', lineHeight: '50px' }}>
              {index + 1}
            </Typography>
          </Box>
        ))}

        <Box
          sx={{
            position: 'absolute',
            top: `${spritePosition.y}%`,
            left: `${spritePosition.x}%`,
            width: '30px',
            height: '30px',
            backgroundColor: 'red',
            borderRadius: '50%',
            transition: 'top 0.5s, left 0.5s',
          }}
        />
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
