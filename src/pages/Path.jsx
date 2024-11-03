import React, { useState, useEffect } from 'react';
import { Typography, Box, Popover, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
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

  const open = Boolean(anchorEl);

  return (
    <>
      <Typography variant="h4" gutterBottom mt={8}>
        Learning Path
      </Typography>

      <Box sx={{ position: 'relative', height: '100%', width: '100%' }}>
        {parsedLectureContent.lectures.map((lecture, index) => {
          const leftShift = [0, 25, -15, 0][index] || 0;

          return (
            <Button
              key={index}
              className="button-3d"
              variant="contained"
              color="primary"
              disabled={index + 1 > unlockedLectures}
              sx={{
                position: 'relative',
                top: `${(index + 0.5) * 20}%`,
                left: `${leftShift}%`,
                transform: 'perspective(800px) rotateY(5deg) rotateX(35deg) rotateZ(-10deg)',
              }}
              onClick={(event) => {
                if (index + 1 <= unlockedLectures) {
                  handlePopoverOpen(event, lecture);
                }
              }}
            >
              <Typography variant="h6" sx={{ color: 'white', lineHeight: '50px' }}>
                {index + 1}
              </Typography>
            </Button>
          );
        })}
      </Box>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
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
    </>
  );
}
