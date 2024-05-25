import {
  Box,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { thirukkural } from '@/data/thirukkural';
import Link from '../app/Link';
import { sortBy } from '@opentf/std';

export default function Chapters() {
  const chapters = sortBy(thirukkural.chapters, ['name', 'asc']);

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
