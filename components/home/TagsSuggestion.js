import { Box, Divider, Typography } from '@mui/material';
import TagIcon from '@mui/icons-material/Tag';
import { useRouter } from 'next/router';
import Tag from '../app/Tag';

export default function TagsSuggestion() {
  const router = useRouter();

  const handleExplore = (val) => {
    router.push(`/events/search?tag=${val}`);
  };

  const tags = [
    {
      label: 'Lese-Majesty',
      info: 'An offence or defamation against the dignity of a ruling head of state',
    },
    { label: 'War Crime', info: '' },
    { label: 'MSF', info: 'Médecins Sans Frontières (Doctors Without Borders)' },
    { label: 'Drone Art', info: '' },
    { label: 'WCK', info: 'World Central Kitchen' },
    { label: 'Insurgency', info: '' },
    { label: 'Sallikkattu', info: 'Traditional Bull Sport' },
    { label: 'Zika', info: 'A Virus' },
    { label: 'Cancer', info: '' },
    { label: 'ICJ', info: 'International Court of Justice' },
  ];

  return (
    <Box p={1}>
      <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
        <TagIcon /> Tags Suggestion
      </Typography>
      <Divider sx={{ borderColor: 'darkgray' }} />
      <Box mt={2} p={1}>
        {tags.map((t, i) => (
          <Tag
            key={i}
            label={t.label}
            sx={{ m: 1 }}
            onClick={() => handleExplore(t.label)}
            info={t.info}
          />
        ))}
      </Box>
    </Box>
  );
}
