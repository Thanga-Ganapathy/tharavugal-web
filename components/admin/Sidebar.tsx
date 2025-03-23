'use client';

import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';

interface MenuProps {
  obj: { menu: string; path: string };
}

function Menu({ obj }: MenuProps) {
  const pathname = usePathname();
  const router = useRouter();

  console.log('pathname', pathname);
  
  
  return (
    <ListItem disablePadding>
      <ListItemButton
        selected={pathname === obj.path}
        onClick={() => router.push(obj.path)}
      >
        <ListItemText primary={obj.menu} />
      </ListItemButton>
    </ListItem>
  );
}

export default function Sidebar() {
  const menus = [
    { menu: 'Dashboard', path: '/admin' },
    { menu: 'Events', path: '/admin/events' },
    { menu: 'Locations', path: '/admin/locations' },
    { menu: 'Event Categories', path: '/admin/event-categories' },
    { menu: 'Event Locations', path: '/admin/event-locations' },
    { menu: 'Entity Types', path: '/admin/entity-types' },
    { menu: 'Entities', path: '/admin/entities' },
    { menu: 'Food Ingredients', path: '/admin/food-ingredients' },
    { menu: 'Contribution Logs', path: '/admin/contribution-logs' },
    { menu: 'Resources', path: '/admin/resources' },
    { menu: 'Thamizhl Dictionary', path: '/admin/thamizhl-dictionary' },
    { menu: 'Announcements', path: '/admin/announcements' },
    { menu: 'Feedbacks', path: '/admin/feedbacks' },
  ];

  return (
    <List>
      {menus.map((m, i) => (
        <Menu key={i} obj={m} />
      ))}
    </List>
  );
}
