// src/pages/Sources.jsx

import React from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import Navigation from '../components/Navigation';

const sources = [
    { title: 'Source 1', description: 'Description of source 1' },
    { title: 'Source 2', description: 'Description of source 2' },
    { title: 'Source 3', description: 'Description of source 3' },
];

export default function Sources() {
    return (
        <Container className="container" sx={{ textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>
                Sources
            </Typography>
            <List>
                {sources.map((source, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={source.title} secondary={source.description} />
                    </ListItem>
                ))}
            </List>
            <Navigation />
        </Container>
    );
}