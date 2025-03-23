import Layout from '@/components/layouts/DefaultLayout';
import { Badge, Box, Typography } from '@mui/material';
import { TaInput } from '@opentf/react-ta-input';
import { useEffect, useRef } from 'react';

export default function ThamizhlTyping(): JSX.Element {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <Layout
      title="தமிழ் தட்டச்சு - Thamizhl Typing"
      meta={{
        desc: 'தமிழ் தட்டச்சு - திரை விசைப்பலகை; Online thamizhl typing tool with on-screen keyboard.',
        urlPath: 'thamizhl-typing',
      }}
    >
      {/* ...existing code... */}
    </Layout>
  );
}
