import { Box, Paper, Typography, Alert, AlertTitle } from '@mui/material';

function InfoBox({ title, content, source }) {
  return (
    <Paper variant="outlined" sx={{ minHeight: '50px', p: 2, m: 1 }}>
      <Typography variant="h6" sx={{ color: (t) => t.palette.info.dark }}>
        {title}
      </Typography>
      <Typography sx={{ mt: 2 }}>{content}</Typography>
      {source && (
        <Typography sx={{ mt: 2 }}>
          <Box component="span" sx={{ fontWeight: 'bold' }}>
            Source:
          </Box>{' '}
          {source}
        </Typography>
      )}
    </Paper>
  );
}

export default function Info() {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <InfoBox title="Original Author(s)" content="Unknown" />
      <InfoBox title="Original Publication" content="Unknown" />
      <InfoBox title="Chapters" content="133" />
      <InfoBox title="Kurals" content="1,330" />
      <InfoBox
        title="Attributed Author Name"
        content="Traditionaly, the Thamizhl scholars attributed the author's name to Thiruvalluvar."
      />
      <InfoBox
        title="First Known Modern Printing"
        content="The Thiruthanigai Visakhaperumalayar and Arumuka Navalar from Yaazhlpaanam were the first
          known to copy thirukkural from palm script into a modern printing
          press."
        source="வள்ளுவரும் குறளும் - கி. ஆ. பெ. விசுவநாதம்"
      />
      <InfoBox
        title="Annual Festival Audio Recording & Printing"
        content="The third annual festival of Coimbatore Anupparpalayam Thiruvalluvar Padippagam was audio recorded and printed by the Gopalswamy Doraiswamy Naidu."
        source="வள்ளுவரும் குறளும் - கி. ஆ. பெ. விசுவநாதம்"
      />
      <InfoBox
        title="'வள்ளுவர் வரலாறு எது?' - Conference"
        content="More than 530 Thamizhl scholars attended the conference on March 31, 1939, at Pachaiyappa's College, Chennai."
        source="வள்ளுவரும் குறளும் - கி. ஆ. பெ. விசுவநாதம்"
      />
    </Box>
  );
}
