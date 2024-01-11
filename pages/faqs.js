import Layout from '@/components/layouts/DefaultLayout';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from 'next/link';

function QA({ q, a }) {
  return (
    <Box sx={{ mb: 2 }}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">{q}</Typography>
        </AccordionSummary>
        <AccordionDetails>{a}</AccordionDetails>
      </Accordion>
    </Box>
  );
}

export default function FAQs() {
  return (
    <Layout title="FAQs">
      <Box textAlign="center">
        <Typography variant="h4">FAQs</Typography>
      </Box>
      <Box sx={{ p: 5, mt: 2 }}>
        <QA
          q="What is the meaning of `Tharavugal`?"
          a={
            <Box>
              <strong>Tharavugal</strong> is a Thamizhl (தமிழ்) language word,
              and in simple terms, it means data.
            </Box>
          }
        />
        <QA q="Is this a NEWS site?" a={<Box>No.</Box>} />
        <QA
          q="How do I become a member of this organization?"
          a={
            <Box>
              The public can become members only through the recommendation of
              the <strong>CORE MEMBERS</strong> of the organization based on
              their ethical work.
            </Box>
          }
        />
        <QA
          q="What are ALPHA and BETA tags?"
          a={
            <Box>
              <Typography variant="body1">
                The tags or markers on the page indicate that the content is not
                completely ready for public usage.
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Box mt={2}>
                  <Chip size="small" color="secondary" label="ALPHA" /> {' - '}{' '}
                  The Alpha tag is used to indicate that the content may be
                  experimental, partially released, or might have issues.
                </Box>
                <Box mt={2}>
                  <Chip size="small" color="warning" label="BETA" /> {' - '} The
                  Beta tag is used to indicate that the content has not been
                  verified or validated by the respective members.
                </Box>
              </Box>
            </Box>
          }
        />
      </Box>
    </Layout>
  );
}
