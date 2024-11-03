import React, { useState, useEffect } from 'react';
import { Typography, Box, Popover, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import parsedLectureContent from '../data/parsedLectureContent.json';

export default function Path() {
  // State to keep track of the number of unlocked lectures
  const [unlockedLectures, setUnlockedLectures] = useState(1);

  // State to manage the anchor element for the popover
  const [anchorEl, setAnchorEl] = useState(null);

  // State to store the selected lecture for the popover
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

  // Function to open the popover
  const handlePopoverOpen = (event, lecture) => {
    setAnchorEl(event.currentTarget);
    setSelectedLecture(lecture);
  };

  // Function to close the popover
  const handlePopoverClose = () => {
    setAnchorEl(null);
    setSelectedLecture(null);
  };

  // Boolean to check if the popover is open
  const open = Boolean(anchorEl);

  return (
    <>
      <Typography variant="h3" gutterBottom mt={8} mb={8}>
        Learning Path
      </Typography>

      {/* Container for the lecture buttons 
      <Box height="100%"> */}
        {parsedLectureContent.lectures.map((lecture, index) => {
          // Calculate the left shift for the button position
          const centerAllVertically = [96, 32, -32, -96][index] || 0;
          const leftShift = [-48, 32, -16, 64][index] + centerAllVertically;
          const downShift = [0, 15, 30, 45][index] || 0;

          return (
            <Button
              key={index}
              variant="contained"
              color="primary"
              disabled={index + 1 > unlockedLectures}
              sx={{
                width: '64px',
                height: '64px',
                top: `${downShift}%`,
                left: `${leftShift}px`,
                transform: 'perspective(800px) rotateY(15deg) rotateX(40deg) rotateZ(-15deg)',
              }}
              onClick={(event) => {
                if (index + 1 <= unlockedLectures) {
                  handlePopoverOpen(event, lecture);
                }
              }}
            >
              <Typography variant="h5" sx={{ color: 'white' }}>
                {index + 1}
              </Typography>
            </Button>
          );
        })}
      {/* </Box> */}

      <Popover
        open={open}
        //anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
        <Box p="16px"
             textAlign="center"
             //backgroundColor="#252525"
            >
          <Typography variant="h6" pb="8px">{selectedLecture?.title.split(':')[1]}</Typography>
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
        </Box>
      </Popover>
    </>
  );
}
