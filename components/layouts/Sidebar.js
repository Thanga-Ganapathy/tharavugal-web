import React from 'react';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@mui/material';
import {
  FcServices,
  FcHome,
  FcInfo,
  FcConferenceCall,
  FcHighPriority,
  FcAbout,
  FcBriefcase,
  FcReading,
} from 'react-icons/fc';
import Link from '../Link';

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
        overflowY: 'auto',
      }}
    >
      <List dense>
        <ListItemButton component={Link} href="/" selected>
          <ListItemIcon>
            <FcHome />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton component={Link} href="/tools" alignItems="flex-start">
          <ListItemIcon>
            <FcServices />
          </ListItemIcon>
          <ListItemText primary="Tools" />
        </ListItemButton>
        <ListItemButton component={Link} href="/facts">
          <ListItemIcon>
            <FcInfo />
          </ListItemIcon>
          <ListItemText primary="Facts" />
        </ListItemButton>
        <ListItemButton component={Link} href="/open-discussions">
          <ListItemIcon>
            <FcConferenceCall />
          </ListItemIcon>
          <ListItemText primary="Open Disucssions" />
        </ListItemButton>
        <ListItemButton component={Link} href="/open-issues">
          <ListItemIcon>
            <FcHighPriority />
          </ListItemIcon>
          <ListItemText primary="Open Issues" />
        </ListItemButton>
        <ListItemButton component={Link} href="/entities">
          <ListItemIcon>
            <FcAbout />
          </ListItemIcon>
          <ListItemText primary="Entities" />
        </ListItemButton>
        <ListItemButton component={Link} href="/projects">
          <ListItemIcon>
            <FcBriefcase />
          </ListItemIcon>
          <ListItemText primary="Projects" />
        </ListItemButton>
        <ListItemButton component={Link} href="/thamizhl-தமிழ்">
          <ListItemIcon>
            <FcReading />
          </ListItemIcon>
          <ListItemText primary="Thamizhl (தமிழ்)" />
        </ListItemButton>
      </List>
    </Paper>
  );
};

export default Sidebar;
