import { Box } from '@mui/material';
import Link from 'next/link';
import HeadingWithDivider from '../HeadingWithDivider';

function SectionBox({ title, href }) {
  return (
    <Box
      component="a"
      href={href}
      sx={{
        p: 2,
        m: 1,
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: '#001f3f',
        borderRadius: '8px',
        textDecoration: 'none',
        textTransform: 'capitalize',
        '&:hover': {
          backgroundColor: 'rgba(1, 255, 112, 0.5)',
          color: 'black',
        },
      }}
    >
      {title}
    </Box>
  );
}

export default function Sections() {
  return (
    <Box p={1}>
      <HeadingWithDivider title="Sections" sx={{ mb: 2 }} />
      <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap' }}>
        <SectionBox title="Open Discussions" href="/open-discussions" />
        <SectionBox title="Open Issues" href="/open-issues" />
        <SectionBox title="Entities" href="/entities" />
        <SectionBox title="Facts" href="/facts" />
      </Box>
    </Box>
  );
}
