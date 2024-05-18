import { Box, Card, Divider, Typography } from '@mui/material';
import { FcAdvertising } from 'react-icons/fc';
import useSWR from 'swr';
import { format } from 'date-fns';
import Link from '../app/Link';

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
          <Link sx={{ mt: 1 }} href={data.link.url}>
            {data.link.text}
          </Link>
        </>
      )}
      {data.link2?.text && (
        <>
          <br />
          <Link href={data.link2.url}>{data.link2.text}</Link>
          <br />
        </>
      )}
      <Box sx={{ textAlign: 'right' }}>
        <Typography variant="subtitle2">
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
      <Box mt={1} p={1}>
        {error && <Box>❗Failed to load.</Box>}
        {isLoading && <Box>Loading...</Box>}
        {renderAnnouncements()}
      </Box>
    </Box>
  );
}
