import Layout from '@/components/layouts/DefaultLayout';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';

import { thirukkural } from '@/data/thirukkural';
import Kural from '@/components/thirukkural/Kural';
import { useEffect } from 'react';
import { useState } from 'react';

export default function Athigaaram() {
  const [chapter, setChapter] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const chap = thirukkural.chapters.find(
        (c) => c.slug === router.query.athigaaram
      );
      setChapter(chap);
    }
  }, [router]);

  if (!chapter) {
    return 'Loading...';
  }

  const sortedKurals = () => {
    return chapter.kurals.sort((a, b) => {
      const nameA = a.kural.l1;
      const nameB = b.kural.l1;
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    });
  };

  return (
    <Layout title={`${chapter.name} - திருக்குறள்`}>
      <Box textAlign="center">
        <Typography variant="h5">{chapter.name} - திருக்குறள்</Typography>
        <Typography variant="body1">
          ({chapter.translations.find((t) => t.id === 'en').text})
        </Typography>
      </Box>
      <Box sx={{ mt: 2 }}>
        {sortedKurals().map((kural, i) => (
          <Kural key={i} data={kural} index={i} />
        ))}
      </Box>
    </Layout>
  );
}
