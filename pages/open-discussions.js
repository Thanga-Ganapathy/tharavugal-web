import Layout from '@/components/layouts/DefaultLayout';
import { Alert, Box, Paper, Tooltip, Typography } from '@mui/material';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import Link from '@/components/app/Link';

function DiscussionBox({ title }) {
  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6">{title}</Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mt: 2,
          justifyContent: 'space-between',
        }}
      >
        <Tooltip title="Positive">
          <Box sx={{ display: 'flex' }}>
            0<ChatOutlinedIcon sx={{ ml: 1, color: 'success.main' }} />
          </Box>
        </Tooltip>
        <Tooltip title="Neutral">
          <Box sx={{ display: 'flex' }}>
            0 <ChatOutlinedIcon sx={{ ml: 1, color: 'primary.main' }} />
          </Box>
        </Tooltip>
        <Tooltip title="Negative">
          <Box sx={{ display: 'flex' }}>
            0 <ChatOutlinedIcon sx={{ ml: 1, color: 'error.main' }} />
          </Box>
        </Tooltip>
      </Box>
    </Paper>
  );
}

export default function OpenDiscussions() {
  const data = [
    'Government should undertake private orphanages?',
    'Is palm toddy should be made open to the public in thamizhl naadu?',
    'Should we rename Brahmi script into Thamizhi script?',
    'How can we avoid flood disasters in Chennai and surrounding districts?',
    'Sexual abuse of girl children.',
    'Untouchability between people.',
    'Malnutrition among children.',
    'What is Dravidian?',
  ];

  return (
    <Layout title="Open Discussions">
      <Box textAlign="center">
        <Typography variant="h5">Open Discussions</Typography>
      </Box>
      <Alert severity="warning">
        Work in Pipeline, please follow the{' '}
        <Link href="/work-pipeline">Work Pipeline</Link> for updates.
      </Alert>
      <Box sx={{ mt: 2 }}>
        {data.map((d, i) => (
          <DiscussionBox key={i} title={d} />
        ))}
      </Box>
    </Layout>
  );
}
