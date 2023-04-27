import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useRouter } from 'next/router';

export default function Sidebar() {
  const router = useRouter();

  return (
    <List>
      <ListItem disablePadding>
        <ListItemButton
          selected={router.pathname === '/admin'}
          onClick={() => router.push('/admin')}
        >
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton selected={router.pathname === '/admin/events'}
          onClick={() => router.push('/admin/events')}>
          <ListItemText primary="Events" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton selected={router.pathname === '/admin/event-categories'}
          onClick={() => router.push('/admin/event-categories')}>
          <ListItemText primary="Event Categories" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton selected={router.pathname === '/admin/event-locations'}
          onClick={() => router.push('/admin/event-locations')}>
          <ListItemText primary="Event Locations" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton selected={router.pathname === '/admin/entity-types'}
          onClick={() => router.push('/admin/entity-types')}>
          <ListItemText primary="Entity Types" />
        </ListItemButton>
      </ListItem>
    </List>
  );
}