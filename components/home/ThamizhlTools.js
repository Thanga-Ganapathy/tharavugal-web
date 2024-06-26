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
        <ChevronRightIcon /> Thamizhl (தமிழ்)
      </Typography>
      <Divider sx={{ borderColor: 'darkgray' }} />

      <Box
        py={2}
        sx={{ display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap' }}
      >
        <ToolBox
          active
          icon={OpenBook}
          label="Thamizhl Dictionary (அகராதி)"
          path="/thamizhl-dictionary"
        />
        <ToolBox
          active
          icon={BookOutlinedIcon}
          label="Thirukkural (திருக்குறள்)"
          path="/thirukkural"
        />
        <ToolBox
          active
          icon={BookOutlinedIcon}
          label="Aathichoodi (ஆத்திசூடி)"
          path="/aathichoodi"
        />
        <ToolBox
          icon={FcCalendar}
          label="Thamizhl Calendar (தமிழ் நாட்காட்டி)"
          path="/thamizhl-calendar"
        />
        <ToolBox
          active
          icon={KeyboardIcon}
          label="Thamizhl Typing (தமிழ் தட்டச்சு)"
          path="/thamizhl-typing"
        />
      </Box>
    </Box>
  );
}
