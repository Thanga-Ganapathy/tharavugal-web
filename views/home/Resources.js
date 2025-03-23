import { Box, Chip } from '@mui/material';
import AudioFileOutlinedIcon from '@mui/icons-material/AudioFileOutlined';
import { useRouter } from 'next/navigation';
import { FcDocument, FcLandscape, FcStart } from 'react-icons/fc';
import Books from '@/icons/Books';

function Resource({ name, icon: Icon, path }) {
  const router = useRouter();

  return (
    <Chip
      variant="outlined"
      color="default"
      sx={[
        {
          m: 1,
          bgcolor: 'white',
          px: '5px'
        },
        (t) =>
          t.applyStyles('dark', {
            background: 'black',
          }),
      ]}
      onClick={() => router.push(path)}
      label={name}
      icon={<Icon style={{ height: '16px' }} />}
    />
  );
}

export default function Resources() {
  return (
    <Box
      sx={{
        // mt: 1,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
    >
      <Resource name="Images" icon={FcLandscape} path="/resources/images" />
      <Resource name="Videos" icon={FcStart} path="/resources/videos" />
      <Resource
        name="Audios"
        icon={AudioFileOutlinedIcon}
        path="/resources/audios"
      />
      <Resource
        name="Documents"
        icon={FcDocument}
        path="/resources/documents"
      />
      <Resource name="Books" icon={Books} path="/resources/books" />
    </Box>
  );
}
