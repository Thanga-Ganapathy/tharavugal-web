import Head from 'next/head';
import { Backdrop, Box, Toolbar } from '@mui/material';
import AppHeader from './AppHeader';
import { InfinitySpin } from 'react-loader-spinner';
import { useAppState } from '@/store';
import Footer from './Footer';
import { META_INFO } from '@/constants';
import DonationBanner from './DonationBanner';
import UserAgreement from './UserAgreement';

export default function DefaultLayout({ children, title = '', meta = {} }) {
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
      >
        <DonationBanner />
        {children}
      </Box>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <InfinitySpin width="200" color="#FF851B" />
      </Backdrop>
      <Footer />
      <UserAgreement />
    </Box>
  );
}
