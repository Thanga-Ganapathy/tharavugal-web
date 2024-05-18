import { Box, Grid, Paper, Typography } from '@mui/material';
import { format } from 'date-fns';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import Feedback from '../app/Feedback';
import Link from '../app/Link';

function LI({ title, href, children }) {
  return (
    <Box component="li" sx={{ mt: 2, color: 'white' }}>
      <Link
        href={href}
        sx={{
          color: 'white',
          textDecoration: 'none',
          '&:hover': { textDecoration: 'underline' },
        }}
      >
        {title ?? children}
      </Link>
    </Box>
  );
}

function Heading({ title }) {
  return (
    <Typography
      variant="body1"
      sx={{
        color: 'white',
        textDecoration: 'none',
        borderBottom: '3px solid #FF851B',
        display: 'inline',
        fontWeight: 'bold',
      }}
    >
      {title}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Paper
      component="footer"
      sx={{
        mt: 5,
        p: 3,
        backgroundColor: (t) =>
          t.palette.mode === 'light' ? 'black' : undefined,
      }}
    >
      <Grid container px={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Heading title="Organization" />
          <Box mt={2} component="ul">
            <LI href="/about-us" title="About Us" />
            <LI href="/contact-us" title="Contact Us" />
          </Box>
        </Grid>
        <Grid item xs={12} sx={{ mt: { xs: 2, sm: 0 } }} sm={6} md={3}>
          <Heading title="Useful Links" />
          <Box mt={2} component="ul">
            <LI href="/work-pipeline" title="Work Pipeline" />
            <LI href="/faqs" title="FAQs" />
            <LI href="/kb" title="Knowledge Base" />
          </Box>
        </Grid>
        <Grid item xs={12} sx={{ mt: { xs: 2, sm: 0 } }} sm={6} md={3}>
          <Heading title="Legal" />
          <Box mt={2} component="ul">
            <LI href="/terms-conditions" title="Terms & Conditions" />
            <LI href="/privacy-policy" title="Privacy Policy" />
          </Box>
        </Grid>

        <Grid item xs={12} sx={{ mt: { xs: 2, sm: 0 } }} sm={6} md={3}>
          <Heading title="Others" />
          <Box mt={2} component="ul">
            <LI href="/credits" title="Credits" />
            <LI href="https://github.com/Tharavugal/web">
              Code Repository - Github
              <OpenInNewOutlinedIcon sx={{ fontSize: '12px' }} />
            </LI>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
        <Feedback />
      </Box>

      <Box sx={{ mt: 3, color: 'white' }} textAlign="center">
        © 2023 - {format(new Date(), 'yyyy')} Tharavugal.org
      </Box>
    </Paper>
  );
}
