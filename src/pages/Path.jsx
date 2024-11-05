import React, { useState, useEffect } from 'react';
import { Typography, Box, Button, SwipeableDrawer } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import Navigation from '../components/Navigation';

import parsedLectureContent from '../data/parsedLectureContent.json';

export default function Path() {
  // State to keep track of the number of unlocked lectures
  const [unlockedLectures, setUnlockedLectures] = useState(1);

  // State to manage the anchor element for the drawer
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  // State to store the selected lecture for the drawer
  const [selectedLecture, setSelectedLecture] = useState(null);

  // useEffect to load the number of unlocked lectures from localStorage
  useEffect(() => {
    const storedUnlockedLectures = JSON.parse(localStorage.getItem('unlockedLectures'));
    if (storedUnlockedLectures) {
      setUnlockedLectures(storedUnlockedLectures);
    } else {
      localStorage.setItem('unlockedLectures', JSON.stringify(1));
    }
  }, []);

  // Hook to navigate between routes
  const navigate = useNavigate();

  // Function to handle lecture button click
  const handleLectureClick = (id) => {
    if (id <= unlockedLectures) {
      navigate(`/lecture/${id}`);
    }
  };

  // Function to open the drawer
  const handleDrawerOpen = (event, lecture) => {
    setOpen(true);
    setSelectedLecture(lecture);
  };

  // Function to close the drawer
  const handleDrawerClose = () => {
    setOpen(false);
    setSelectedLecture(null);
  };

  return (
    <>
      <Typography variant="h3" my={8}>
        Learning Path
      </Typography>

      <Box mb={12}
           sx={{ height: '100%',
                 display: 'flex',
                 flexDirection: 'column',
                 justifyContent: 'center',
           }}>
      <Box display="flex" justifyContent="center" position="relative" height="100%">
      {parsedLectureContent.lectures.map((lecture, index) => {
        const centerAllVertically = [96, 32, -32, -96][index] || 0;
        const leftShift = [-48, 32, -16, 64][index] + centerAllVertically;

        return (
          <Button
            key={index}
            variant="contained"
            color="primary"
            disabled={index + 1 > unlockedLectures}
            sx={{
              width: '64px',
              height: '64px',
              top: `${(index) * 25}%`,
              left: `${leftShift}px`,
              transform: 'perspective(800px) rotateY(15deg) rotateX(40deg) rotateZ(-15deg)',
            }}
            onClick={(event) => {
              if (index + 1 <= unlockedLectures) {
                handleDrawerOpen(event, lecture);
              }
            }}
          >
            <Typography variant="h5">
              {index + 1}
            </Typography>
          </Button>
        );
      })}
      </Box>
      </Box>

      <SwipeableDrawer
        open={open}
        anchor="bottom"
        onClose={handleDrawerClose}
        >
        <Box textAlign="center"
             p={4}>

          <Typography variant="h6" gutterBottom>
            {selectedLecture?.title.split(':')[0]}:
          </Typography>
          <Typography variant="h5" gutterBottom mb={6}>
            {selectedLecture?.title.split(':')[1]}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            sx={{ width: 'calc(100% - 64px)'}}
            onClick={() => {
              handleLectureClick(parsedLectureContent.lectures.indexOf(selectedLecture) + 1);
              handleDrawerClose();
            }}
          >
            Start Lecture
          </Button>
        </Box>
      </SwipeableDrawer>

      <Navigation />
    </>
  );
}
