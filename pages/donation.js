import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import Link from '@/components/app/Link';
import Layout from '@/components/layouts/DefaultLayout';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Paper,
  Typography,
} from '@mui/material';

export default function Donation() {
  return (
    <Layout title="Donation">
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
          <VolunteerActivismIcon sx={{ mr: 1 }} /> Donation
        </Typography>
      </Box>
      <Paper sx={{ mt: 2, p: 3 }}>
        <Typography variant="h4">
          Every donation helps us continue our work and create meaningful
          change.
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>
          - No amount is too small to make a difference.
        </Typography>

        <Alert severity="warning" sx={{ mt: 2 }}>
          Currently, we cannot integrate any Payment Gateway into our app; once
          the Core-Members align, they will take over the organization with all
          the legal proceedings.
        </Alert>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            mt: 5,
          }}
        >
          <Card variant="outlined" sx={{ m: 1 }}>
            <CardContent>
              <Typography>
                For the 🇮🇳 Republic of India and other GPay-supported countries,
                you can donate by scanning the following QR code:
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box
                  component="img"
                  sx={{
                    mt: 3,
                    width: '100%',
                    height: 'auto',
                    maxWidth: '400px',
                  }}
                  src="/images/qr.png"
                  alt="Pay Button"
                />
              </Box>
            </CardContent>
          </Card>

          <Card variant="outlined" sx={{ m: 1 }}>
            <CardContent>
              <Typography>
                For outside the 🇮🇳 Republic of India, You can donate via PayPal
                with the following link.
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Link href="https://www.paypal.com/paypalme/thangaganapathy">
                  <Button variant="outlined" sx={{ mt: 3 }}>
                    <Box
                      component="img"
                      sx={{ width: '100%', height: 'auto' }}
                      src="https://www.paypalobjects.com/digitalassets/c/website/logo/full-text/pp_fc_hl.svg"
                      alt="Pay Button"
                    />
                  </Button>
                </Link>
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Alert severity="info" sx={{ mt: 5 }}>
          If you have any issues with donating or have queries, please contact
          us via Email:{' '}
          <Link href="mailto:admin@tharavugal.org">admin@tharavugal.org</Link>
        </Alert>

        <Alert severity="success" sx={{ mt: 5 }}>
          If possible, please share your Transaction ID after donating via email
          to get your Name, amount and other details to be listed in the{' '}
          <Link href="/contribution-logs">Contribution Logs</Link>
        </Alert>

        <Typography variant="h5" sx={{ mt: 3, textAlign: 'center' }}>
          🙏Thank you for your support!
        </Typography>
      </Paper>
    </Layout>
  );
}
