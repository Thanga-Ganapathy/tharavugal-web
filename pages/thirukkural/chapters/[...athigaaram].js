import Layout from '@/components/layouts/DefaultLayout';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { thirukkural } from '@/data/thirukkural';
import Kural from '@/components/thirukkural/Kural';
import { useEffect } from 'react';
import { useState } from 'react';
import Link from '@/components/app/Link';
import { sortBy } from '@opentf/std';
import { isEmpty } from '@opentf/std';
import { isNull } from '@opentf/std';
import Search from '@/components/thirukkural/Search';

export default function Athigaaram() {
  const [chapter, setChapter] = useState(null);
  const [kurals, setKurals] = useState([]);
  const [kural, setKural] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const chap = thirukkural.chapters.find(
        (c) => c.slug === router.query.athigaaram[0]
      );

      setChapter(chap);

      if (router.query.athigaaram[1]) {
        const kObj = chap.kurals.find(
          (k) => k.id === parseInt(router.query.athigaaram[1])
        );
        setKural(kObj);
      } else {
        setKurals(sortBy(chap.kurals, [(o) => o.kural.l1, 'asc']));
      }
    }
  }, [router]);

  if (!chapter) {
    return 'Loading...';
  }

  const chanpterEnName = chapter.translations.find((t) => t.id === 'en').text;

  const renderBackLink = () => {
    if (!isNull(kural)) {
      return (
        <Link
          href={`/thirukkural/chapters/${chapter.slug}`}
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <ChevronLeftIcon /> {chapter.name} ({chanpterEnName})
        </Link>
      );
    }

    return (
      <Link href="/thirukkural" sx={{ display: 'flex', alignItems: 'center' }}>
        <ChevronLeftIcon /> அதிகாரங்கள் (Chapters)
      </Link>
    );
  };

  return (
    <Layout title={`${chapter.name} - திருக்குறள்`}>
      {renderBackLink()}
      <Box textAlign="center" sx={{ mt: 2 }}>
        <Typography variant="h5">{chapter.name} - திருக்குறள்</Typography>
        <Typography variant="body1">({chanpterEnName})</Typography>
      </Box>

      <Search />

      <Box sx={{ mt: 2 }}>
        {!isEmpty(kurals) &&
          kurals.map((k, i) => (
            <Kural key={i} chapter={chapter.slug} data={k} index={i} />
          ))}
        {!isNull(kural) && <Kural data={kural} chapter={chapter.slug} />}
      </Box>
    </Layout>
  );
}
