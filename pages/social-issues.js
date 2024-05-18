import Layout from '@/components/layouts/DefaultLayout';
import {
  Alert,
  Box,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import useAlert from '@/hooks/useAlert';
import Link from '@/components/app/Link';

function IssueBox({ title }) {
  const showAlert = useAlert();

  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">{title}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box>0</Box>
          <Tooltip title="Up Vote">
            <IconButton
              onClick={() => showAlert('error', 'Please sign in to continue')}
            >
              <ArrowUpwardOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Paper>
  );
}

export default function SocialIssues() {
  const data = [
    'Sexual abuse of girl children.',
    'Untouchability between people.',
    'Malnutrition among children.'
  ];

  return (
    <Layout title="Social Issues">
      <Box textAlign="center">
        <Typography variant="h4">Social Issues</Typography>
      </Box>
      <Alert severity="warning" sx={{ mt: 2 }}>
        Work in Pipeline, please follow the{' '}
        <Link href="/work-pipeline">Work Pipeline</Link> for updates.
      </Alert>
      <Box>
        {data.map((d, i) => (
          <IssueBox key={i} title={d} />
        ))}
      </Box>
    </Layout>
  );
}
