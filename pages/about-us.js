import Link from '@/components/app/Link';
import Layout from '@/components/layouts/DefaultLayout';
import { Box, Paper, Typography } from '@mui/material';

export default function AboutUs() {
  return (
    <Layout title="About Us">
      <Box textAlign="center">
        <Typography variant="h4">About Us</Typography>
      </Box>
      <Paper sx={{ p: 5, mt: 2 }}>
        <Typography variant="body1">
          Tharavugal is a non-profit data platform that structures data
          contributed by its members. The contents are freely accessible to the
          public.
        </Typography>
        <Typography variant="body1" mt={1}>
          It also provides tools for data exploration, visualization, research,
          etc.
        </Typography>

        <Typography variant="body1" mt={2}>
          Some of the significant features include:
        </Typography>

        <ul>
          <li>Open Source</li>
          <li>Ad Free (Always)</li>
          <li>Research-Oriented</li>
          <li>
            No User Tracking (
            <Link href="/privacy-policy">Click here to learn more</Link>)
          </li>
        </ul>

        <Typography variant="body1" mt={2}>
          Please <Link href="/contact-us">contact us</Link> for more info.
        </Typography>
      </Paper>
    </Layout>
  );
}
