import Head from 'next/head';
import { Backdrop, Box, Toolbar, Typography, Button } from '@mui/material';
import AppHeader from './AppHeader';
import { InfinitySpin } from 'react-loader-spinner';
import { useAppState } from '@/store';
import { useState } from 'react';
import Footer from './Footer';
import Link from '../app/Link';
import { META_INFO } from '@/constants';

export default function DefaultLayout({ children, title = '', meta = {} }) {
  const [agreement, setAgreement] = useState(localStorage.getItem('agreement'));
  const isLoading = useAppState((s) => s.loading);
  const curTitle = title + ' - ' + META_INFO.title;

  const renderMetaInfo = () => {
    return (
      <>
        <meta key="__meta_title" name="title" content={curTitle} />
        <meta
          key="__meta_desc"
          name="description"
          content={meta.desc ?? META_INFO.desc}
        />
        <meta property="og:type" content="website" />
        <meta key="__meta_og_title" property="og:title" content={curTitle} />
        <meta
          key="__meta_og_desc"
          property="og:description"
          content={meta.desc ?? META_INFO.desc}
        />
        <meta key="__meta_og_img" property="og:image" content="" />
        <meta
          key="__meta_og_url"
          property="og:url"
          content={META_INFO.url + (meta.urlPath ? meta.urlPath : '')}
        />
      </>
    );
  };

  return (
    <Box sx={{ height: '100%' }}>
      <Head>
        <title>{curTitle}</title>
        {renderMetaInfo()}
      </Head>
      <AppHeader themeMode="light" />
      <Toolbar variant="dense" />
      <Box
        pb={15}
        sx={{ minHeight: 'calc(100% - 50px)', p: { xs: 1, sm: 1, md: 2 } }}
        // bgcolor="#E7EBF0"
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
            <Link
              sx={{ color: 'white', textDecorationColor: 'white' }}
              underline="always"
              href="/terms-conditions"
            >
              Terms & Conditions
            </Link>{' '}
            and{' '}
            <Link
              sx={{ color: 'white', textDecorationColor: 'white' }}
              href="/privacy-policy"
              underline="always"
            >
              Privacy Policy
            </Link>
          </Typography>
          <Button
            variant="outlined"
            sx={{ mt: 1, background: 'white', color: 'black' }}
            onClick={() => {
              localStorage.setItem('agreement', true);
              setAgreement(true);
            }}
          >
            ✔️ Accept
          </Button>
          <Button
            variant="outlined"
            sx={{ mt: 1, background: 'white', color: 'black', ml: 2 }}
            onClick={() => {
              localStorage.setItem('agreement', false);
              setAgreement(true);
            }}
          >
            ❌ Dismiss
          </Button>
        </Box>
      )}
    </Box>
  );
}
