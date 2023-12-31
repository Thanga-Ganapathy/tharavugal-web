import { Divider, Typography } from "@mui/material";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function HeadingWithDivider({ title }) {
  return (
    <>
      <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
        <ChevronRightIcon /> {title}
      </Typography>
      <Divider sx={{ borderColor: 'darkgray' }} />
    </>
  );
}
