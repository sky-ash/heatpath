// src/pages/Sources.jsx

import React from 'react';

// Material-UI components
import { Typography, List, ListItem, ListItemText } from '@mui/material';

// Sample data for sources
const sources = [
    { title: 'Source 1', description: 'Description of source 1' },
    { title: 'Source 2', description: 'Description of source 2' },
    { title: 'Source 3', description: 'Description of source 3' },
];

// Sources component
export default function Sources() {
    return (
        <>
            {/* Page title */}
            <Typography variant="h4" gutterBottom mt={8}>
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
        </>
    );
}