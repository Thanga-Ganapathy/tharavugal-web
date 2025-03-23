import { Box } from '@mui/material';

import AppHeader from '@/components/layouts/AppHeader';
import Footer from '@/components/layouts/Footer';
import UserAgreement from '@/components/layouts/UserAgreement';
import MainContent from '@/components/layouts/MainContent';

export default function Layout({ children }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh', // Ensure the layout takes full height
      }}
    >
      <AppHeader />

      <MainContent>{children}</MainContent>

      <Footer />
      <UserAgreement />
    </Box>
  );
}
