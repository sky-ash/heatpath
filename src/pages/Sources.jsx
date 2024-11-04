// src/pages/Sources.jsx

import React from 'react';

import Navigation from '../components/Navigation';

// Material-UI components
import { Typography, List, ListItem, ListItemText, Fab, Link } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';

// Sample data for sources
const sources = [
    { title: 'Source 1', description: 'Description of source 1' },
    { title: 'Source 2', description: 'Description of source 2' },
    { title: 'Source 3', description: 'Description of source 3' },
];

// Sources component
export default function Sources() {
    const navigate = useNavigate();
    return (
        <>
            {/* Page title */}
            <Typography variant="h3" gutterBottom mt={8} mb={8}>
                Sources
            </Typography>

            {/* List of sources */}
            <List>
                {sources.map((source, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={source.title} secondary={source.description} />
                    </ListItem>
                ))}
            </List>
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