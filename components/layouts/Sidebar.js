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
import { usePathname } from 'next/navigation'; // Import the usePathname hook

const Sidebar = () => {
  const pathname = usePathname(); // Get the current path

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
        <ListItemButton
          component={Link}
          href="/"
          selected={pathname === '/'} // Check if current path matches
        >
          <ListItemIcon>
            <FcHome />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>

        <ListItemButton
          component={Link}
          href="/tools"
          selected={pathname === '/tools'} // Check if current path matches
        >
          <ListItemIcon>
            <FcServices />
          </ListItemIcon>
          <ListItemText primary="Tools" />
        </ListItemButton>

        <ListItemButton
          component={Link}
          href="/facts"
          selected={pathname === '/facts'} // Check if current path matches
        >
          <ListItemIcon>
            <FcInfo />
          </ListItemIcon>
          <ListItemText primary="Facts" />
        </ListItemButton>

        <ListItemButton
          component={Link}
          href="/open-discussions"
          selected={pathname === '/open-discussions'} // Check if current path matches
        >
          <ListItemIcon>
            <FcConferenceCall />
          </ListItemIcon>
          <ListItemText primary="Open Discussions" />
        </ListItemButton>

        <ListItemButton
          component={Link}
          href="/open-issues"
          selected={pathname === '/open-issues'} // Check if current path matches
        >
          <ListItemIcon>
            <FcHighPriority />
          </ListItemIcon>
          <ListItemText primary="Open Issues" />
        </ListItemButton>

        <ListItemButton
          component={Link}
          href="/entities"
          selected={pathname === '/entities'} // Check if current path matches
        >
          <ListItemIcon>
            <FcAbout />
          </ListItemIcon>
          <ListItemText primary="Entities" />
        </ListItemButton>

        <ListItemButton
          component={Link}
          href="/projects"
          selected={pathname === '/projects'} // Check if current path matches
        >
          <ListItemIcon>
            <FcBriefcase />
          </ListItemIcon>
          <ListItemText primary="Projects" />
        </ListItemButton>

        <ListItemButton
          component={Link}
          href="/thamizhl-தமிழ்"
          selected={decodeURIComponent(pathname) === '/thamizhl-தமிழ்'} // Check if current path matches
        >
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
