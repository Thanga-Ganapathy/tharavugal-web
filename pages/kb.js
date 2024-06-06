import HeadingWithDivider from '@/components/HeadingWithDivider';
import Link from '@/components/app/Link';
import Layout from '@/components/layouts/DefaultLayout';
import kbData from '@/data/kb';
import {
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import { groupBy } from '@opentf/std';
import { useState } from 'react';

function Menu({ obj, selected, onSelect }) {
  return (
    <ListItem disablePadding>
      <ListItemButton
        selected={selected}
        onClick={() => {
          onSelect(obj.menu);
          const element = document.getElementById(`KB_${obj.id}`);
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'nearest',
          });
        }}
      >
        <ListItemText primary={obj.menu} />
      </ListItemButton>
    </ListItem>
  );
}

function Sidebar() {
  const [selected, setSelected] = useState('General');
  const menus = [
    { menu: 'General', id: 'General' },
    { menu: 'Members', id: 'Members' },
    { menu: 'Organization', id: 'Organization' },
    { menu: 'Real-Time Events', id: 'Real_Time_Events' },
  ];

  return (
    <Paper
      sx={{
        width: '240px',
        display: { xs: 'none', md: 'block' },
        height: '80vh',
        position: 'sticky',
        top: '100px',
      }}
      variant="outlined"
    >
      <List>
        {menus.map((m, i) => (
          <Menu
            key={i}
            obj={m}
            selected={selected === m.menu}
            onSelect={(m) => setSelected(m)}
          />
        ))}
      </List>
    </Paper>
  );
}

export default function KB() {
  const groups = groupBy(kbData, 'heading');

  const renderKBs = (arr) => {
    return arr.map((kb, i) => (
      <Card key={i} sx={{ m: 1 }}>
        <CardContent>
          <Typography variant="h6">{kb.title}</Typography>
          <Box
            component="div"
            sx={{ mt: 2 }}
            dangerouslySetInnerHTML={{ __html: kb.content }}
          />
        </CardContent>
      </Card>
    ));
  };

  return (
    <Layout title="Knowledge Base">
      <Box textAlign="center">
        <Typography variant="h6">Knowledge Base</Typography>
      </Box>
      <Box
        sx={{
          display: { md: 'grid' },
          gridTemplateColumns: '240px 1fr',
          position: 'relative',
        }}
      >
        <Sidebar />
        <Box sx={{ p: 2 }}>
          <HeadingWithDivider id="KB_General" title="General" />
          {renderKBs(groups['General'])}
          <HeadingWithDivider id="KB_Members" title="Members" sx={{ mt: 2 }} />
          {renderKBs(groups['Members'])}
          <HeadingWithDivider
            id="KB_Organization"
            title="Organization"
            sx={{ mt: 2 }}
          />
          {renderKBs(groups['Organization'])}
          <HeadingWithDivider
            id="KB_Real_Time_Events"
            title="Real-Time Events"
            sx={{ mt: 2 }}
          />
          {renderKBs(groups['Real-Time Events'])}
        </Box>
      </Box>
    </Layout>
  );
}
