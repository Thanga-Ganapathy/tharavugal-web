import Head from 'next/head';
import { Backdrop, Box, Toolbar, Typography, Button } from '@mui/material';
import AppHeader from './AppHeader';
import { InfinitySpin } from 'react-loader-spinner';
import { useAppState } from '@/store';
import Link from 'next/link';
import { useState } from 'react';
import Footer from './Footer';

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
      <Footer />

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
