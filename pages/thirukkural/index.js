import Layout from '@/components/layouts/DefaultLayout';
import { Masonry } from '@mui/lab';
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Paper,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function Thirukkural() {
  return (
    <Layout title="Thirukkural">
      <Box textAlign="center">
        <Typography variant="h5">திருக்குறள் (Thirukkural)</Typography>
      </Box>
      <Box mt={2}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'right' }}>
              <Chip
                label="Random"
                variant="filled"
                color="secondary"
                size="small"
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box
                sx={{ fontSize: { xs: '14px', sm: '18px', md: '24px' } }}
                component="pre"
              >{`அறத்தான் வருவதே இன்பம்மற் றெல்லாம் 
புறத்த புகழும் இல`}</Box>
            </Box>
          </CardContent>
        </Card>
        <Paper sx={{ p: 2, mt: 2 }}>
          <Typography
            variant="h6"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <ChevronRightIcon /> Browse
          </Typography>
          <Divider />

          <Box mt={1} sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <Box
              component={Link}
              href="/thirukkural/virtue"
              sx={{
                border: '1px groove lightgrey',
                p: 2,
                textDecoration: 'none',
                m: 2,
              }}
            >
              அறத்துப்பால் (VIRTUE)
            </Box>
            <Box
              component={Link}
              href="/thirukkural/wealth"
              sx={{
                border: '1px groove lightgrey',
                p: 2,
                textDecoration: 'none',
                m: 2,
              }}
            >
              பொருட்பால் (WEALTH)
            </Box>
            <Box
              component={Link}
              href="/thirukkural/love"
              sx={{
                border: '1px groove lightgrey',
                p: 2,
                textDecoration: 'none',
                m: 2,
              }}
            >
              இன்பத்துப்பால் (LOVE)
            </Box>
          </Box>
        </Paper>
      </Box>

      <Box mt={2}>
        <Masonry columns={{ xs: 2, sm: 3, md: 4 }} spacing={2}>
          <Paper sx={{ minHeight: '50px', p: 2, textAlign: 'center' }}>
            <Typography variant="h3">1,330</Typography>
            <Typography color="primary">Kurals</Typography>
          </Paper>
          <Paper sx={{ minHeight: '50px', p: 2, textAlign: 'center' }}>
            <Typography variant="h3">133</Typography>
            <Typography color="primary">Chapters</Typography>
          </Paper>
          <Paper sx={{ minHeight: '50px', p: 2, textAlign: 'center' }}>
            <Typography color="primary">Sections</Typography>
            <Box sx={{ textAlign: 'left' }}>
              <ul>
                <li>Virtue</li>
                <li>Wealth</li>
                <li>Love</li>
              </ul>
            </Box>
          </Paper>
          <Paper sx={{ minHeight: '50px', p: 2, textAlign: 'center' }}>
            <Typography color="primary">Total unique words</Typography>
            <Typography variant="h3">_</Typography>
          </Paper>
          <Paper sx={{ minHeight: '50px', p: 2, textAlign: 'center' }}>
            <Typography color="primary">List of Unique words</Typography>
            <Typography variant="h3">_</Typography>
          </Paper>
          <Paper sx={{ minHeight: '50px', p: 2, textAlign: 'center' }}>
            <Typography color="primary">Most repeated word</Typography>
            <Typography variant="h3">_</Typography>
          </Paper>
          <Paper sx={{ minHeight: '50px', p: 2, textAlign: 'center' }}>
            <Typography color="primary">Least repeated word</Typography>
            <Typography variant="h3">_</Typography>
          </Paper>
        </Masonry>
      </Box>
    </Layout>
  );
}
