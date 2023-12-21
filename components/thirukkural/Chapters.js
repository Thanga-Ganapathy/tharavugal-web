import {
  Box,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { thirukkural } from '@/data/thirukkural';

export default function Chapters() {
  const chapters = thirukkural.chapters.sort((a, b) => {
    const nameA = a.name;
    const nameB = b.name;
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });

  return (
    <>
      <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
        <ChevronRightIcon /> அதிகாரங்கள் (Chapters)
      </Typography>
      <Divider sx={{ borderColor: 'darkgray' }} />

      <Box mt={2}>
        <Table>
          <TableBody>
            {chapters.map((row, i) => (
              <TableRow key={i}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>
                  <Link
                    href={{ pathname: `/thirukkural/chapters/${row.slug}` }}
                  >
                    {row.name} (
                    {row.translations.find((t) => t.id === 'en').text})
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </>
  );
}
