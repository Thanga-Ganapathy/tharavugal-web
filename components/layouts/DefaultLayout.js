import Head from 'next/head';
import {
  Backdrop,
  Box,
  Grid,
  Toolbar,
  Typography,
  Button,
} from '@mui/material';
import AppHeader from './AppHeader';
import { InfinitySpin } from 'react-loader-spinner';
import { useAppState } from '@/store';
import Link from 'next/link';
import { useState } from 'react';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import { format } from 'date-fns';

export default function DefaultLayout({ children, title = 'Loading' }) {
  const [agreement, setAgreement] = useState(localStorage.getItem('agreement'));
  const isLoading = useAppState((s) => s.loading);

  return (
    <Box sx={{ height: '100%' }}>
      <Head>
        <title>{title + ' - தரவுகள் | Tharavugal'}</title>
      </Head>
      <AppHeader />
      <Toolbar variant="dense" />
      <Box
        pb={15}
        sx={{ minHeight: 'calc(100% - 50px)', p: { xs: 1, sm: 1, md: 2 } }}
        bgcolor="#E7EBF0"
      >
        {children}
      </Box>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <InfinitySpin width="200" color="#FF851B" />
      </Backdrop>
      <Box
        component="footer"
        sx={{
          bgcolor: 'text.primary',
          color: 'white',
          p: 3,
        }}
      >
        <Grid container px={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Typography
              variant="body2"
              sx={{
                background: 'white',
                color: 'black',
                textDecoration: 'none',
                display: 'inline',
                padding: '3px 10px',
                fontWeight: 'bold',
              }}
            >
              ORGANIZATION
            </Typography>
            <Box mt={2} component="ul">
              <Box component="li">
                <Box
                  component={Link}
                  href="/about-us"
                  sx={{
                    color: 'white',
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  About Us
                </Box>
              </Box>
              <Box component="li">
                <Box
                  component={Link}
                  href="/contact-us"
                  sx={{
                    color: 'white',
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  Contact Us
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sx={{ mt: { xs: 2, sm: 0 } }} sm={6} md={4}>
            <Typography
              variant="body2"
              sx={{
                background: 'white',
                color: 'black',
                textDecoration: 'none',
                display: 'inline',
                padding: '3px 10px',
                fontWeight: 'bold',
              }}
            >
              USEFUL LINKS
            </Typography>
            <Box mt={2} component="ul">
              <Box component="li">
                <Box
                  component={Link}
                  href="/faqs"
                  sx={{
                    color: 'white',
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  FAQs
                </Box>
              </Box>
              <Box component="li">
                <Box
                  component={Link}
                  href="https://github.com/Tharavugal/web"
                  sx={{
                    color: 'white',
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  Code Repository - Github{' '}
                  <OpenInNewOutlinedIcon sx={{ fontSize: '12px' }} />
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sx={{ mt: { xs: 2, sm: 0 } }} sm={6} md={4}>
            <Typography
              variant="body2"
              sx={{
                background: 'white',
                color: 'black',
                textDecoration: 'none',
                display: 'inline',
                padding: '3px 10px',
                fontWeight: 'bold',
              }}
            >
              LEGAL
            </Typography>
            <Box mt={2} component="ul">
              <Box component="li">
                <Box
                  component={Link}
                  href="/terms-conditions"
                  sx={{
                    color: 'white',
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  Terms & Conditions
                </Box>
              </Box>
              <Box component="li">
                <Box
                  component={Link}
                  href="/privacy-policy"
                  sx={{
                    color: 'white',
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  Privacy Policy
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ mt: 3 }} textAlign="center">
          © 2023 - {format(new Date(), 'yyyy')} Tharavugal.org
        </Box>
      </Box>
      {!agreement && (
        <Box
          sx={{
            position: 'sticky',
            bottom: 0,
            left: 0,
            zIndex: 1000,
            width: '100%',
            background: (theme) => theme.palette.warning.light,
            p: 2,
            color: 'white',
            textAlign: 'center',
          }}
        >
          <Typography variant="h5">
            Please read and accept these{' '}
            <Link href="/terms-conditions">Terms & Conditions</Link> and{' '}
            <Link href="/privacy-policy">Privacy Policy</Link> before continuing
            to the web app.
          </Typography>
          <Button
            variant="outlined"
            sx={{ mt: 1, background: 'white', color: 'black' }}
            onClick={() => {
              localStorage.setItem('agreement', true);
              setAgreement(true);
            }}
          >
            I have read & accept
          </Button>
        </Box>
      )}
    </Box>
  );
}
