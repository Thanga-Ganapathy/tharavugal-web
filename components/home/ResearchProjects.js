import { Box, Card, CardContent, Typography } from '@mui/material';
import HeadingWithDivider from '../HeadingWithDivider';
import Link from '../app/Link';

export default function ResearchProjects() {
  return (
    <Box p={1}>
      <HeadingWithDivider title="Research Projects" sx={{ mb: 2 }} />
      <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap' }}>
        <Link href="/research-projects/thamizhl-grammar-engine">
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6">Thamizhl Grammar Engine</Typography>
            </CardContent>
          </Card>
        </Link>
      </Box>
    </Box>
  );
}
