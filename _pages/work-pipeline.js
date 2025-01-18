import Layout from '@/components/layouts/DefaultLayout';
import WorkLevelColumn from '@/components/workPipeline/WorkLevelColumn';
import { Box, Typography } from '@mui/material';

export default function WorkPipeline() {
  const workLevels = [
    {
      title: 'Drafts',
      list: [
        {
          title: 'Home: Alert banner with multiple slides',
          priority: 'Low',
          tags: ['Feature'],
        },
        {
          title: 'Thirukkural: Add kurals & headings text search',
          priority: 'Medium',
          tags: ['Feature'],
        },
        {
          title: 'Real-Time Events: Add research tool',
          priority: 'Low',
          tags: ['Feature'],
        },
        {
          title: 'Open Discussions: Add API & UI',
          priority: 'Low',
          tags: ['Feature'],
        },
      ],
    },
    { title: 'Approved', list: [] },
    {
      title: 'In Progress',
      list: [
        {
          title: 'Work pipeline API & UI',
          priority: 'High',
          tags: ['Admin', 'Feature'],
        },
      ],
    },
    {
      title: 'Completed',
      list: [
        {
          title: 'Featured visualization: Not loading basic form fields',
          priority: 'Medium',
          tags: ['Bug'],
        },
        {
          title: 'Search: App-wide search',
          priority: 'Medium',
          tags: ['Feature'],
        },
        {
          title: 'Thamizhl Dictionary: Add API',
          priority: 'Medium',
          tags: ['Feature'],
        },
        {
          title: 'Thirukkural: Add kurals API with UI to list',
          priority: 'Medium',
          tags: ['Feature'],
        },
      ],
    },
    { title: 'Pending Review', list: [] },
    { title: 'Rejected', list: [] },
    { title: 'Testing', list: [] },
    { title: 'Released', list: [] },
  ];

  return (
    <Layout title="Work Pipeline">
      <Box textAlign="center">
        <Typography variant="h5">Work Pipeline</Typography>
      </Box>
      <Box
        sx={{
          overflowX: 'auto',
          width: '100%',
          mt: 2,
          height: 'calc(100vh - 125px)',
        }}
      >
        <Box sx={{ display: 'inline-flex', pb: 2 }}>
          {workLevels.map((l, i) => (
            <WorkLevelColumn key={i} level={l} />
          ))}
        </Box>
      </Box>
    </Layout>
  );
}
