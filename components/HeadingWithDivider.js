import { Box, Divider, Typography } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function HeadingWithDivider({
  title,
  icon: Icon,
  sx,
  iconSX,
  ...otherProps
}) {
  return (
    <Box sx={{ ...sx }} {...otherProps}>
      <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
        {Icon ? (
          <Icon
            style={{
              width: '35px',
              height: '35px',
              marginRight: '10px',
              ...iconSX,
            }}
          />
        ) : (
          <ChevronRightIcon />
        )}{' '}
        {title}
      </Typography>
      <Divider sx={{ borderColor: 'darkgray' }} />
    </Box>
  );
}
