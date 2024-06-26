import { Box, Divider, Typography } from '@mui/material';
import TagIcon from '@mui/icons-material/Tag';
import { useRouter } from 'next/router';
import Tag from '../app/Tag';
import { sortBy } from '@opentf/std';

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
    { label: 'Drown', info: '' },
    { label: 'Archaeology', info: '' },
    { label: 'Outbreak', info: '' },
    {
      label: 'MSF',
      info: 'Médecins Sans Frontières (Doctors Without Borders)',
    },
    { label: 'WCK', info: 'World Central Kitchen' },
    { label: 'Insurgency', info: '' },
    { label: 'Sallikkattu', info: 'Traditional Bull Sport' },
    {
      label: 'Hepatitis',
      info: 'Virus which causes inflammation in the liver tissue.',
    },
    { label: 'ICJ', info: 'International Court of Justice' },
    { label: 'RSF', info: 'Reporters Without Borders' },
    {
      label: 'OHCHR',
      info: 'Office of the High Commissioner for Human Rights',
    },
    { label: 'Yazh', info: 'A Harp-like instrument.' },
    {
      label: 'Ambergris',
      info: 'It is a solid, waxy, produced in the digestive system of sperm whales.',
    },
  ];

  return (
    <Box p={1}>
      <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
        <TagIcon /> Tags Suggestion
      </Typography>
      <Divider sx={{ borderColor: 'darkgray' }} />
      <Box mt={2} p={1}>
        {sortBy(tags, ['label', 'asc']).map((t, i) => (
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
