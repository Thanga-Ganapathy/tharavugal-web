import { Box, Divider, Typography } from '@mui/material';
import Link from 'next/link';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { thirukkural } from '@/data/thirukkural';

export default function Chapters() {
  return (
    <>
      <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
        <ChevronRightIcon /> அதிகாரங்கள் (Chapters)
      </Typography>
      <Divider />

      <Box mt={2}>
        <Box component="table" sx={{ borderCollapse: 'collapse' }}>
          <Box component="tbody">
            {thirukkural.chapters.map((ch, i) => (
              <Box component="tr" key={i}>
                <Box component="td" sx={{ border: '1px solid black', p: 1 }}>
                  {i + 1}
                </Box>
                <Box component="td" sx={{ border: '1px solid black', p: 1 }}>
                  <Link href={{ pathname: `/thirukkural/chapters/${ch.slug}` }}>
                    {ch.name} ({ch.translations.find((t) => t.id === 'en').text}
                    )
                  </Link>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}
