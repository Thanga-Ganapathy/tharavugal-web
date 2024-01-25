import { Box, Chip, Tooltip } from '@mui/material';

export default function TimelineTitle({ title, toolTip }) {
  return (
    <Box>
      <Box
        component="span"
        sx={{
          display: 'inline-block',
          width: '8px',
          height: '8px',
          background: '#AAAAAA',
          borderRadius: '50%',
        }}
      />
      <Box component="span" sx={{ marginLeft: '10px' }}>
        <Tooltip title={toolTip} placement='right' arrow>
          <Chip
            size="small"
            variant="outlined"
            label={title}
            sx={{
              fontWeight: 'bold',
              background: '#FF851B',
              color: 'white',
              borderColor: '#FF851B',
              letterSpacing: '1px',
            }}
          />
        </Tooltip>
      </Box>
    </Box>
  );
}
