import { getDB } from '@/lib/db';
import ContributionLog from '@/views/contributions-logs/ContributionLog';
import { Alert, Box, Typography } from '@mui/material';

// Server Component for fetching data
async function getContributionLogs() {
  const db = await getDB();
  const col = db.collection('contribution-logs');
  const cursor = col.find(
    {},
    {
      projection: {
        _id: 0,
      },
    }
  );
  return await cursor.toArray();
}

const config = {
  R2_DOMAIN: process.env.R2_DOMAIN, // Get environment variables on server side
};

// Main Page Component (Server Component)
export default async function ContributionLogsPage() {
  const logs = await getContributionLogs(); // Server-side fetching

  return (
    <Box>
      <Box textAlign="center">
        <Typography variant="h5">Contribution Logs</Typography>
      </Box>
      <Box mt={2}>
        <Alert severity="info">
          All contributions made to the organization are recorded in the system,
          allowing you to view a variety of contribution types here (with a few
          exceptions).
        </Alert>
      </Box>
      <Box mt={2} sx={{ p: { xs: 1, sm: 1, md: 2 } }}>
        {logs.map((log) => (
          <ContributionLog key={log.id} data={log} config={config} />
        ))}
      </Box>
    </Box>
  );
}
