import { Box, Grid, Typography } from '@mui/material';
import { format } from 'date-fns';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import Link from 'next/link';

function LI({ title, href, children }) {
  return (
    <Box component="li">
      <Box
        component={Link}
        href={href}
        sx={{
          color: 'white',
          textDecoration: 'none',
          '&:hover': { textDecoration: 'underline' },
        }}
      >
        {title ?? children}
      </Box>
    </Box>
  );
}

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'text.primary',
        color: 'white',
        p: 3,
      }}
    >
      <Grid container px={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Typography
            variant="body2"
            sx={{
              background: 'white',
              color: 'black',
              textDecoration: 'none',
              display: 'inline',
              padding: '3px 10px',
              fontWeight: 'bold',
            }}
          >
            ORGANIZATION
          </Typography>
          <Box mt={2} component="ul">
            <LI href="/about-us" title="About Us" />
            <LI href="/contact-us" title="Contact Us" />
          </Box>
        </Grid>
        <Grid item xs={12} sx={{ mt: { xs: 2, sm: 0 } }} sm={6} md={3}>
          <Typography
            variant="body2"
            sx={{
              background: 'white',
              color: 'black',
              textDecoration: 'none',
              display: 'inline',
              padding: '3px 10px',
              fontWeight: 'bold',
            }}
          >
            USEFUL LINKS
          </Typography>
          <Box mt={2} component="ul">
            <LI href="/work-pipeline" title="Work Pipeline" />
            <LI href="/faqs" title="FAQs" />
            <LI href="/kb" title="Knowledge Base" />
          </Box>
        </Grid>
        <Grid item xs={12} sx={{ mt: { xs: 2, sm: 0 } }} sm={6} md={3}>
          <Typography
            variant="body2"
            sx={{
              background: 'white',
              color: 'black',
              textDecoration: 'none',
              display: 'inline',
              padding: '3px 10px',
              fontWeight: 'bold',
            }}
          >
            LEGAL
          </Typography>
          <Box mt={2} component="ul">
            <LI href="/terms-conditions" title="Terms & Conditions" />
            <LI href="/privacy-policy" title="Privacy Policy" />
          </Box>
        </Grid>

        <Grid item xs={12} sx={{ mt: { xs: 2, sm: 0 } }} sm={6} md={3}>
          <Typography
            variant="body2"
            sx={{
              background: 'white',
              color: 'black',
              textDecoration: 'none',
              display: 'inline',
              padding: '3px 10px',
              fontWeight: 'bold',
            }}
          >
            Others
          </Typography>
          <Box mt={2} component="ul">
            <LI href="/credits" title="Credits" />
            <LI href="https://github.com/Tharavugal/web">
              Code Repository - Github
              <OpenInNewOutlinedIcon sx={{ fontSize: '12px' }} />
            </LI>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3 }} textAlign="center">
        © 2023 - {format(new Date(), 'yyyy')} Tharavugal.org
      </Box>
    </Box>
  );
}
