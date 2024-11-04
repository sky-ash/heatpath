import React from 'react';

import Navigation from '../components/Navigation';

// Material-UI components
import { Typography, List, ListItem, ListItemText, Fab, Link } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

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
                    <Link to="/settings">
          <Fab color="primary"
              sx={{ position: 'absolute', zIndex: 1,
                    margin: '0 auto', top: -20,
                    left: 0, right: 0, }}>
            <SettingsIcon />
          </Fab>
        </Link>
        </>
    );
}
