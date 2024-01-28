import { Box, Divider, Typography } from '@mui/material';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import { FcCalendar } from 'react-icons/fc';

import ToolBox from './tools/ToolBox';
import OpenBook from '../icons/OpenBook';

export default function ThamizhlTools() {
  return (
    <Box p={1}>
      <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
        <ChevronRightIcon /> Thamizhl
      </Typography>
      <Divider sx={{ borderColor: 'darkgray' }} />

      <Box
        py={2}
        sx={{ display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap' }}
      >
        <ToolBox
          active
          icon={OpenBook}
          label="Thamizhl Dictionary"
          path="/thamizhl-dictionary"
        />
        <ToolBox
          active
          icon={BookOutlinedIcon}
          label="Thirukkural"
          path="/thirukkural"
        />
        <ToolBox
          active
          icon={BookOutlinedIcon}
          label="Aathichoodi"
          path="/aathichoodi"
        />
        <ToolBox
          icon={FcCalendar}
          label="Thamizhl Calendar"
          path="/thamizhl-calendar"
        />
        <ToolBox
          active
          icon={KeyboardIcon}
          label="Thamizhl Typing"
          path="/thamizhl-typing"
        />
      </Box>
    </Box>
  );
}
