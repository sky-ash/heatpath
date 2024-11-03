// src/pages/Sources.jsx

import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@mui/material';

const sources = [
    { title: 'Source 1', description: 'Description of source 1' },
    { title: 'Source 2', description: 'Description of source 2' },
    { title: 'Source 3', description: 'Description of source 3' },
];

export default function Sources() {
    return (
        <>
            <Typography variant="h4" gutterBottom mt={8}>
                Sources
            </Typography>
            <List>
                {sources.map((source, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={source.title} secondary={source.description} />
                    </ListItem>
                ))}
            </List>
        </>
    );
}