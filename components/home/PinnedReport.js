import { Box, Card, CardContent, Typography } from '@mui/material';
import HeadingWithDivider from '../HeadingWithDivider';
import { PushPin } from '@mui/icons-material';
import Link from '../app/Link';

export default function PinnedReport() {
  return (
    <Box p={1} sx={{ mt: 1 }}>
      <HeadingWithDivider
        title="Pinned Report"
        icon={PushPin}
        sx={{ px: 1 }}
        // iconSX={{ color: '#85144b' }}
      />
      <Box mt={1}>
        <Card variant="outlined">
          <CardContent>
            <Link href="/reports/republic-of-india-general-election-parliamentary-constituencies-2024">
              <Typography variant="h6">
                🇮🇳 The Republic of India - General Election - Parliamentary
                Constituencies (2024) Report
              </Typography>
            </Link>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
