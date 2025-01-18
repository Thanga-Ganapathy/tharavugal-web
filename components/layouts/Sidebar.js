import React from 'react';
import { Box, List, ListItem, ListItemText, Paper } from '@mui/material';

const Sidebar = () => {
  return (
    <Paper
      variant="outlined"
      sx={{
        position: 'sticky',
        top: 100,
        height: '75vh',
        backgroundColor: 'background.paper',
        padding: 2,
        borderRadius: '20px',
      }}
    >
      <List>
        <ListItem>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem>
          <ListItemText primary="About" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Services" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Contact" />
        </ListItem>
      </List>
    </Paper>
  );
};

export default Sidebar;
