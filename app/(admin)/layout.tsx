import { Box } from '@mui/material';

import AppHeader from '@/components/layouts/AppHeader';
import Sidebar from '@/components/admin/Sidebar';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh', // Ensure the layout takes full height
      }}
    >
      <AppHeader />
      <main>
        <Box sx={{ display: 'grid', gridTemplateColumns: '250px 1fr' }}>
          <Box sx={{ borderRight: '1px solid #e0e0e0' }}>
            <Sidebar />
          </Box>
          <Box sx={{ p: 3 }}>{children}</Box>
        </Box>
      </main>
    </Box>
  );
}
