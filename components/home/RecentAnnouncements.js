import { Box, Card, Divider, Typography } from '@mui/material';
import { FcAdvertising } from 'react-icons/fc';
import Link from 'next/link';
import useSWR from 'swr';
import { format } from 'date-fns';

function AnnounceBox({ data }) {
  return (
    <Card sx={{ p: 2, mt: 2 }} variant="outlined">
      <Typography variant="h5" sx={{ color: (t) => t.palette.info.dark }}>
        {data.title}
      </Typography>
      <Typography variant="subtitle1" sx={{ mt: 1 }}>
        {data.desc}
      </Typography>
      {data.link.text && (
        <>
          <Box sx={{ mt: 1 }} component={Link} href={data.link.url}>
            {data.link.text}
          </Box>
        </>
      )}
      {data.link2?.text && (
        <>
          <br />
          <Box component={Link} href={data.link2.url}>
            {data.link2.text}
          </Box>
          <br />
        </>
      )}
      <Box sx={{ textAlign: 'right' }}>
        <Typography variant="body2">
          {format(new Date(data.createdAt), 'MMM dd, yyyy')}
        </Typography>
      </Box>
    </Card>
  );
}

export default function RecentAnnouncements() {
  const {
    data: announcements,
    error,
    isLoading,
  } = useSWR('/api/announcements');

  const renderAnnouncements = () => {
    if (!announcements) {
      return null;
    }

    return announcements.data.map((a, i) => <AnnounceBox key={i} data={a} />);
  };

  return (
    <Box p={1}>
      <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
        <FcAdvertising style={{ fontSize: '35px', marginRight: '10px' }} />{' '}
        Announcements
      </Typography>
      <Divider sx={{ borderColor: 'darkgray' }} />
      <Box mt={1}>
        {error && <Box>Failed to load</Box>}
        {isLoading && <Box>Loading...</Box>}
        {renderAnnouncements()}
      </Box>
    </Box>
  );
}
