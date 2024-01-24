import Layout from '@/components/layouts/DefaultLayout';
import { Box, Paper, Typography } from '@mui/material';
import Link from 'next/link';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

export default function ContactUs() {
  return (
    <Layout title="Contact Us">
      <Box textAlign="center">
        <Typography variant="h4">Contact Us</Typography>
      </Box>
      <Paper sx={{ p: 5, mt: 2 }}>
        <Box>
          <Box>
            <EmailOutlinedIcon
              sx={{ fontSize: '50px', color: 'primary.main' }}
            />
          </Box>
          <Box>
            <Typography variant="subtitle1">
              For any queries or support, please write to us.
            </Typography>
            <Typography variant="body1" mt={2}>
              Email ID:{' '}
              <Link href="mailto:admin@tharavugal.org">
                admin@tharavugal.org
              </Link>
            </Typography>
          </Box>
        </Box>
        <Box mt={2}>
          <Box>
            <LocationOnOutlinedIcon
              sx={{ fontSize: '50px', color: 'primary.main' }}
            />
          </Box>
          <Box>
            <Typography variant="body1" sx={{ textDecoration: 'underline' }}>
              Location
            </Typography>
            <Box component="address" mt={2}>
              Chennai
              <br />
              Thamizhl Naadu
              <br />
              Republic of India (Union of States)
            </Box>
          </Box>
        </Box>
      </Paper>
    </Layout>
  );
}
