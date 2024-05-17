import { Box, Chip, Divider, Typography } from '@mui/material';
import TagIcon from '@mui/icons-material/Tag';
import { useRouter } from 'next/router';

export default function TagsSuggestion() {
  const router = useRouter();

  const handleExplore = (val) => {
    router.push(`/events/search?tag=${val}`);
  };

  const tags = [
    'Lese-Majesty',
    'War Crime',
    'Charred',
    'Drone Art',
    'Electrocution',
    'Insurgency',
    'Sallikkattu',
    'Zika',
    'Cancer',
    'ICJ'
  ];

  return (
    <Box p={1}>
      <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
        <TagIcon /> Tags Suggestion
      </Typography>
      <Divider sx={{ borderColor: 'darkgray' }} />
      <Box mt={2} p={1}>
        {tags.map((t, i) => (
          <Chip
            variant="outlined"
            color="default"
            key={i}
            label={t}
            sx={{ m: 1 }}
            size="small"
            onClick={() => handleExplore(t)}
          />
        ))}
      </Box>
    </Box>
  );
}
