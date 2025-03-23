import { AppProps } from 'next/app';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
// ...existing code...

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  // ...existing code...
}
