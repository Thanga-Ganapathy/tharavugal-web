import { Box, Divider, Typography } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Link from 'next/link';

export default function Links() {
  return (
    <Box p={1}>
      <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
        <ChevronRightIcon /> Links
      </Typography>
      <Divider sx={{ borderColor: 'darkgray' }} />
      <Box>
        <ul>
          <li>
            <Link href="/work-pipeline">Work Pipeline</Link>
          </li>
          <li>
            <Link href="/open-discussions">Open Discussions</Link>
          </li>
          <li>
            <Link href="/open-issues">Open Issues</Link>
          </li>
          <li>
            <Link href="/social-issues">Social Issues</Link>
          </li>
          <li>
            <Link href="/contributing-process">Contributing Process</Link>
          </li>
          <li>
            <Link href="/entities">Entities</Link>
          </li>
          <li>
            <Link href="/statistics">Statistics</Link>
          </li>
          <li>
            <Link href="/contribution-logs">Contribution Logs</Link>
          </li>
          <li>
            <Link href="/knowledge-base">Knowledge Base</Link>
          </li>
        </ul>
      </Box>
    </Box>
  );
}
