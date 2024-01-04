import { Box, Divider, Typography } from '@mui/material';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import ToolBox from './tools/ToolBox';

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
          icon={ImportContactsIcon}
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
          icon={CalendarMonthOutlinedIcon}
          label="Thamizhl Calendar"
          path="/thamizhl-calendar"
        />
      </Box>
    </Box>
  );
}
