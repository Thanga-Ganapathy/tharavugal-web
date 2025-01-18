'use client';

import APIClient from '@/utils/APIClient';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { SnackbarProvider } from 'notistack';
import { SWRConfig } from 'swr';

export default function Providers({ children }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <SnackbarProvider maxSnack={3}>
        <SWRConfig
          value={{
            fetcher: APIClient.get,
            onError(err, key, config) {
              console.log(err);
              console.log(err.status);
              console.log(key);
              console.log(config);
            },
          }}
        >
          {children}
        </SWRConfig>
      </SnackbarProvider>
    </LocalizationProvider>
  );
}
