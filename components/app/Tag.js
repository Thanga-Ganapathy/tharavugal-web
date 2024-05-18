import { Chip, Tooltip } from '@mui/material';

export default function Tag({ label, info, ...otherProps }) {
  return (
    <Tooltip title={info} placement="top" arrow>
      <Chip
        label={label}
        variant="outlined"
        color="default"
        size="small"
        {...otherProps}
      />
    </Tooltip>
  );
}
