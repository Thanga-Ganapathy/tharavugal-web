import { Box } from '@mui/material';
import DashCard from './DashCard';

export default function Dashboard({ data }) {
  return (
    <Box sx={{ display: 'flex', p: 5 }}>
      <DashCard title="Events" count={0} />
    </Box>
  );
}
