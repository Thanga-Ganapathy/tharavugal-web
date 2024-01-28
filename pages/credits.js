import Layout from '@/components/layouts/DefaultLayout';
import { Alert, Box, Paper, Typography } from '@mui/material';
import Link from 'next/link';

export default function Credits() {
  return (
    <Layout title="Credits">
      <Box textAlign="center">
        <Typography variant="h6">Credits</Typography>
      </Box>
      <Paper sx={{ p: { xs: 1, sm: 2, md: 5 } }}>
        <Alert severity="info">
          🙏 Thanks to the people who indirectly helped us.
        </Alert>
        <Box sx={{ mt: 2 }}>
          <Typography variant="h5">Hosting</Typography>
          <Box mt={2}>
            <Link href="https://vercel.com">Vercel</Link> - Free web hosting.
          </Box>
        </Box>
        
        <Box sx={{ mt: 2 }}>
          <Typography variant="h5">CDN</Typography>
          <Box mt={2}>
            <Link href="https://cloudflare.com">Cloudflare</Link> - Free CDN services.
          </Box>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="h5">Database</Typography>
          <Box mt={2}>
            <Link href="https://www.mongodb.com/">MongoDB</Link> - Free database
            clusters.
          </Box>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="h5">Icons</Typography>
          <Box mt={2}>
            <Link href="https://mozilla.github.io/fxemoji/LICENSE.md">
              FxEmojis by Mozilla
            </Link>{' '}
            - Free emoji icons.
          </Box>
          <Box mt={2}>
            <Link href="https://icons8.com/">Flat Color Icons by Icons8</Link> -
            Free color icons.
          </Box>
        </Box>
      </Paper>
    </Layout>
  );
}
