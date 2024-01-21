import { Box, Grid, Typography } from '@mui/material';
import { format } from 'date-fns';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import Link from 'next/link';

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
            <Box component="li">
              <Box
                component={Link}
                href="/about-us"
                sx={{
                  color: 'white',
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                About Us
              </Box>
            </Box>
            <Box component="li">
              <Box
                component={Link}
                href="/contact-us"
                sx={{
                  color: 'white',
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                Contact Us
              </Box>
            </Box>
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
            <Box component="li">
              <Box
                component={Link}
                href="/faqs"
                sx={{
                  color: 'white',
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                FAQs
              </Box>
            </Box>
            <Box component="li">
              <Box
                component={Link}
                href="https://github.com/Tharavugal/web"
                sx={{
                  color: 'white',
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                Code Repository - Github{' '}
                <OpenInNewOutlinedIcon sx={{ fontSize: '12px' }} />
              </Box>
            </Box>
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
            <Box component="li">
              <Box
                component={Link}
                href="/terms-conditions"
                sx={{
                  color: 'white',
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                Terms & Conditions
              </Box>
            </Box>
            <Box component="li">
              <Box
                component={Link}
                href="/privacy-policy"
                sx={{
                  color: 'white',
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                Privacy Policy
              </Box>
            </Box>
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
            <Box component="li">
              <Box
                component={Link}
                href="/credits"
                sx={{
                  color: 'white',
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                Credits
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3 }} textAlign="center">
        © 2023 - {format(new Date(), 'yyyy')} Tharavugal.org
      </Box>
    </Box>
  );
}
