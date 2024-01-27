import Head from 'next/head';
import { Backdrop, Box, Toolbar, Typography, Button } from '@mui/material';
import AppHeader from './AppHeader';
import { InfinitySpin } from 'react-loader-spinner';
import { useAppState } from '@/store';
import Link from 'next/link';
import { useState } from 'react';
import Footer from './Footer';

const metaInfo = {
  title: 'தரவுகள் | Tharavugal',
  desc: 'Tharavugal is a non-profit data platform that structures data contributed by its members. The contents are freely accessible to the public.',
  url: 'https://tharavugal.org/',
};

export default function DefaultLayout({
  children,
  title = '',
  meta = {},
}) {
  const [agreement, setAgreement] = useState(localStorage.getItem('agreement'));
  const isLoading = useAppState((s) => s.loading);
  const curTitle = title + ' - ' + metaInfo.title
  
  const renderMetaInfo = () => {
    return (
      <>
        <meta name="title" content={curTitle} />
        <meta name="description" content={meta.desc ?? metaInfo.desc} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={metaInfo.url} />
        <meta property="og:title" content={curTitle} />
        <meta property="og:description" content={meta.desc ?? metaInfo.desc} />
        <meta property="og:image" content="" />
      </>
    );
  };

  return (
    <Box sx={{ height: '100%' }}>
      <Head>
        <title>{curTitle}</title>
        {renderMetaInfo()}
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
