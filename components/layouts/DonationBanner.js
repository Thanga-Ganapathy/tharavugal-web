import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import Link from '../Link';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Paper,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';

export default function DonationBanner() {
  const router = useRouter();

  return (
    (<Box
      sx={[{
        mt: { xs: 2, sm: 1, md: 0 },
        mb: 1,
        justifyContent: 'center'
      }, router.asPath === '/donation' ? {
        display: 'none'
      } : {
        display: 'flex'
      }]}
    >
      <Paper>
        <Alert severity="error" variant="standard">
          <AlertTitle>IMPORTANT</AlertTitle>
          <Typography>
            🙏 We Need your Financial Support to Continue to Run this Service.
          </Typography>
          <Typography sx={{ mt: 1 }}>
            ( இந்தச் சேவையைத் தொடர்ந்து இயக்க எங்களுக்கு உங்கள் நிதி உதவி
            தேவைப்படுகிறது. )
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Link href="/donation">
              <Button
                variant="contained"
                sx={{ display: 'flex', alignItems: 'center' }}
                size="small"
              >
                <VolunteerActivismIcon />{' '}
                <Typography sx={{ ml: 1, fontWeight: 'bold' }}>
                  Donate
                </Typography>
              </Button>{' '}
            </Link>
          </Box>
        </Alert>
      </Paper>
    </Box>)
  );
}
