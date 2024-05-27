import Layout from '@/components/layouts/DefaultLayout';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Chip,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from '@/components/app/Link';

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
      <Box sx={{ p: { xs: 3, sm: 3, md: 5 }, mt: 2 }}>
        <QA
          q="What is the meaning of `Tharavugal`?"
          a={
            <Box>
              Tharavugal is a Thamizhl (தமிழ்) language word, and in simple
              terms, it means data.
            </Box>
          }
        />
        <QA
          q="What kind of data is available on Tharavugal.org?"
          a={
            <Box>
              <Typography variant="body1">
                Many kinds of data are available here; some of them are:
              </Typography>
              <Box sx={{ mt: 2 }}>
                <ul>
                  <li>Real-Time Events</li>
                  <li>Facts</li>
                  <li>Health</li>
                  <li>Environment</li>
                  <li>Cultural</li>
                  <li>Literatures</li>
                </ul>
              </Box>
              <Typography variant="subtitle2">
                And much more to come...
              </Typography>
            </Box>
          }
        />
        <QA q="Is this a news site?" a={<Box>No.</Box>} />
        <QA
          q="How do I become a member of this organization?"
          a={
            <Box>
              The public can become members only through the recommendation of
              the <strong>CORE MEMBERS</strong> of the organization based on
              their ethical (அறம்) works.
              <br />
              <br />
              But you can promote yourself or someone else by sending us an
              email with details. There is no guarantee of approval, but it will
              definitely be evaluated by the core members.
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
        <QA
          q="Why the word `தமிழ்` is written as `Thamizhl` instead of standard `Tamil` here?"
          a={
            <Box>
              <Typography variant="body1">
                The current standard English spelling for the word{' '}
                <strong>தமிழ்</strong> is <strong>Tamil</strong>, which does not
                sound correct.
                <br />
                <br />
                Eventhough we cannot directly map every alphabet in the language
                to the English language but we can get more closer with the
                available alphabets and their sounds.
                <br />
                <br />
                You might also have seen words usage like{' '}
                <strong>Thamizh</strong> and <strong>Thamizhan</strong>. Which
                sounds more close than existing.
                <br />
                <br />
                The word <strong>Thamizhl</strong> is used for non-native
                language speakers to pronounce the word without any bizarre
                sounding.
                <br />
                <br />
                The letter <strong>z</strong> is used to indicate or hint to
                non-native readers that the word contains a different sound.
                <br />
                <br />
                Finally, this is not a strict suggestion; everyone is welcome to
                discuss this in our{' '}
                <Link href="/open-discussions">open-discussions</Link> section.
              </Typography>
            </Box>
          }
        />
        <Alert severity="info">
          Learn more about various topics on the{' '}
          <Link href="/kb">Knowledge Base</Link> page.
        </Alert>
      </Box>
    </Layout>
  );
}
