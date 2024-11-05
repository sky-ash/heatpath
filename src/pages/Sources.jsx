import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import { Typography, List, ListItem, ListItemText, Fab, Link, Box, IconButton, Collapse, Grid } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useNavigate } from 'react-router-dom';
import parsedLectureContent from '../data/parsedLectureContent.json';

// Sources component
export default function Sources() {
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState({});

    const handleExpandClick = (index) => {
        setExpanded((prevExpanded) => ({
            ...prevExpanded,
            [index]: !prevExpanded[index],
        }));
    };

    return (
        <>
            {/* Page title */}
            <Typography variant="h3" my={8}>
                Sources
            </Typography>

            <Box mb={12} px={1}
                 sx={{ height: '100%',
                       width: '100%',
                       display: 'flex',
                       flexDirection: 'column',
                       justifyContent: 'flex-start',
                       alignItems: 'left',
                 }}>
                {parsedLectureContent.lectures.map((lecture, lectureIndex) => (
                    <Box key={lectureIndex} mb={4}>
                        <Typography variant="h5" my={2} align='left'>
                            {lecture.title.split(":")[1]}
                        </Typography>
                        <List>
                            {lecture.sources.map((source, sourceIndex) => (
                                <ListItem key={sourceIndex}>
                                    <Grid container spacing={1}>
                                        <Grid item>
                                            <IconButton
                                                component={Link}
                                                href={source.url}
                                                target="_blank"
                                                rel="noopener"
                                            >
                                                <OpenInNewIcon />
                                            </IconButton>
                                        </Grid>
                                        <Grid item xs>
                                            <Typography variant="h7" fontStyle="bold">
                                                {source.title} {source.year && `(${source.year})`}
                                            </Typography>
                                            <Grid container alignItems="center">
                                                <Grid item xs>
                                                    <Typography component="span" variant="body2" color="textPrimary">
                                                        {source.author}
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => handleExpandClick(`${lectureIndex}-${sourceIndex}`)}
                                                    >
                                                        {expanded[`${lectureIndex}-${sourceIndex}`] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
                                            <Collapse in={expanded[`${lectureIndex}-${sourceIndex}`]} timeout="auto" unmountOnExit>
                                                <Typography variant="body2" color="textSecondary" mt={1}>
                                                    {source.citation}
                                                </Typography>
                                            </Collapse>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                ))}
                <Box mt={8} textAlign='bottom'>
                    .
                </Box>
            </Box>
            

            {/* Navigation component */}
            <Navigation />
            <Fab color="primary"
                 onClick={() => navigate('/settings')}
                 sx={{ position: 'fixed', zIndex: 'tooltip',
                       left: '50%', transform: 'translateX(-50%)',
                       bottom: 32, }}>
                <SettingsIcon />
            </Fab>

        </>
    );
}