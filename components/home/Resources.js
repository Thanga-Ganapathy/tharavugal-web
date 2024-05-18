import { Box, Card, Divider, Typography } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AudioFileOutlinedIcon from '@mui/icons-material/AudioFileOutlined';
import { useRouter } from 'next/router';
import { FcDocument, FcLandscape, FcStart } from 'react-icons/fc';
import Books from '../icons/Books';

function Resource({ name, icon: Icon, path }) {
  const router = useRouter();

  return (
    <Card
      variant="outlined"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: 1,
        m: 1,
        width: 'max-content',
        cursor: 'pointer',
        minWidth: '105px',
        minHeight: '100px',
        '&:hover': {
          background: '#01ff709e',
        },
      }}
      onClick={() => router.push(path)}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box component={Icon} sx={{ width: '50px', height: '50px' }} />
      </Box>
      <Typography
        textAlign="center"
        mt={1}
        variant="body1"
        sx={{ userSelect: 'none' }}
        fontSize={14}
      >
        {name}
      </Typography>
    </Card>
  );
}

export default function Resources() {
  return (
    <Box p={1}>
      <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
        <ChevronRightIcon /> Resources
      </Typography>
      <Divider sx={{ borderColor: 'darkgray' }} />
      <Box mt={1} sx={{ mt: 1, display: 'flex', flexWrap: 'wrap' }}>
        <Resource name="IMAGES" icon={FcLandscape} path="/resources/images" />
        <Resource name="VIDEOS" icon={FcStart} path="/resources/videos" />
        <Resource
          name="AUDIOS"
          icon={AudioFileOutlinedIcon}
          path="/resources/audios"
        />
        <Resource
          name="DOCUMENTS"
          icon={FcDocument}
          path="/resources/documents"
        />
        <Resource name="BOOKS" icon={Books} path="/resources/books" />
      </Box>
    </Box>
  );
}
