import { Box } from '@mui/material';
import HeadingWithDivider from '../HeadingWithDivider';
import Link from '../app/Link';

export default function Sections() {
  return (
    <Box p={1}>
      <HeadingWithDivider title="Sections" sx={{ mb: 2 }} />
      <Box sx={{ mt: 2 }}>
        <ul>
          <li>
            <Link href="/open-discussions">Open Discussions</Link>
          </li>
          <li>
            <Link href="/open-issues">Open Issues</Link>
          </li>
          <li>
            <Link href="/entities">Entities</Link>
          </li>
          <li>
            {' '}
            <Link href="/facts">Facts</Link>
          </li>
        </ul>
      </Box>
    </Box>
  );
}
