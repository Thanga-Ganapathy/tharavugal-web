'use client';

import { Box } from '@mui/material';
import Sidebar from '@/components/layouts/Sidebar';

export default function MainContent({ children }) {
  return (
    <Box
      component="main"
      sx={[
        {
          flex: 1, // Main content takes the remaining space
          background: '#E7EBF0',
          // p: 2,
        },
        (t) =>
          t.applyStyles('dark', {
            background: t.palette.background.default,
          }),
      ]}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '200px 1fr' }, // 1 column on small screens, 2 columns on medium and larger screens
          columnGap: 2,
        }}
      >
        {/* Sidebar */}
        <Box
          sx={{
            position: { md: 'sticky' }, // Sticky on medium screens and above
            top: 0, // Align to the top of the screen
            gridColumn: { md: '1 / 2' }, // Sidebar occupies the first 30% on medium and larger screens
            display: { xs: 'none', md: 'block' }, // Hide sidebar on small screens
          }}
        >
          <Sidebar />
        </Box>

        {/* Main Content Area */}
        <Box
          sx={{
            gridColumn: { xs: '1', md: '2' }, // Main content takes full width on small screens, 70% on larger screens
            padding: 2,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
