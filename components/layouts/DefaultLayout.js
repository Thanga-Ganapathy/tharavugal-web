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

export default function DefaultLayout({ children, title = '', meta = {} }) {
  const [agreement, setAgreement] = useState(localStorage.getItem('agreement'));
  const isLoading = useAppState((s) => s.loading);
  const curTitle = title + ' - ' + metaInfo.title;

  const renderMetaInfo = () => {
    return (
      <>
        <meta name="title" content={curTitle} />
        <meta name="description" content={meta.desc ?? metaInfo.desc} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={metaInfo.url + (meta.urlPath ? meta.urlPath : '')}
        />
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

      {agreement === null && (
        <Box
          sx={{
            position: 'fixed',
            left: { md: '50%' },
            transform: { md: 'translateX(-50%)' },
            m: { xs: 2, sm: 2, md: 0 },
            bottom: '15px',
            borderRadius: '8px',
            zIndex: 1000,
            background: '#85144b',
            p: 2,
            color: 'white',
            textAlign: 'center',
          }}
        >
          <Typography variant="h6">
            Please read our{' '}
            <Box
              component={Link}
              sx={{ color: 'white' }}
              href="/terms-conditions"
            >
              Terms & Conditions
            </Box>{' '}
            and{' '}
            <Box
              component={Link}
              sx={{ color: 'white' }}
              href="/privacy-policy"
            >
              Privacy Policy
            </Box>
          </Typography>
          <Button
            variant="outlined"
            sx={{ mt: 1, background: 'white', color: 'black' }}
            onClick={() => {
              localStorage.setItem('agreement', true);
              setAgreement(true);
            }}
          >
            Accept
          </Button>
          <Button
            variant="outlined"
            sx={{ mt: 1, background: 'white', color: 'black', ml: 2 }}
            onClick={() => {
              localStorage.setItem('agreement', false);
              setAgreement(true);
            }}
          >
            Dismiss
          </Button>
        </Box>
      )}
    </Box>
  );
}
