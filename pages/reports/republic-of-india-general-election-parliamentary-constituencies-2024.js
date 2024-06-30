import Link from '@/components/app/Link';
import Layout from '@/components/layouts/DefaultLayout';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import ReportData from '@/data/reports/lok-saba-2024-evm-report';
import DialogWindow from '@/components/DialogWindow';
import { useState } from 'react';
import HeadingWithDivider from '@/components/HeadingWithDivider';
import { Download } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import { sum } from '@opentf/std';

const constituencies = ReportData.states.flatMap((s) => s.pc);
const unopposedConst = constituencies.filter((c) => c.unopposed);
const totalEvmVotes = sum(constituencies, (c) => c.evmCount);
const totalPostalVotes = sum(constituencies, (c) => c.postalVotes);
const totalUnCountedEVMVotes = sum(ReportData.states, (s) => {
  const totalUnCountedVotes = s.pc.reduce((acc, cur) => {
    const val = cur.evmResult - cur.evmCount;
    return val < 0 ? acc + Math.abs(val) : acc;
  }, 0);

  return totalUnCountedVotes;
});
const totalOverCountedEVMVotes = sum(ReportData.states, (s) => {
  const totalOverCountedVotes = s.pc.reduce((acc, cur) => {
    const val = cur.evmResult - cur.evmCount;
    return val > 0 ? acc + val : acc;
  }, 0);

  return totalOverCountedVotes;
});

function numFormat(n) {
  return new Intl.NumberFormat('en-IN').format(n);
}

function NumberBox({ value, text, variant }) {
  return (
    <Card
      variant="outlined"
      sx={{ m: 1, border: variant ? '1px solid red' : undefined }}
    >
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography variant="h3" sx={{ textAlign: 'center' }}>
          {numFormat(value)}
        </Typography>
        <Typography sx={{ textTransform: 'uppercase', mt: 2 }}>
          {text}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default function Report() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState(null);

  const renderStates = () => {
    return ReportData.states.map((s, i) => (
      <Card
        key={i}
        sx={{
          m: 1,
          backgroundColor: s.enabled
            ? (t) => t.palette.success.main
            : 'inherit',
          color: s.enabled ? 'white' : 'inherit',
          cursor: s.enabled ? 'pointer' : 'inherit',
        }}
        variant="outlined"
        onClick={() => {
          if (s.enabled) {
            setState(s);
            setOpen(true);
          }
        }}
      >
        <CardContent sx={{ pb: 0 }}>
          <Typography variant="h6">
            {s.name} {s.enabled ? `(${s.pc.length})` : ''}
          </Typography>
        </CardContent>
      </Card>
    ));
  };

  const renderState = () => {
    const totalUnCountedVotes = state.pc.reduce((acc, cur) => {
      const val = cur.evmResult - cur.evmCount;
      return val < 0 ? acc + Math.abs(val) : acc;
    }, 0);

    const totalOverCountedVotes = state.pc.reduce((acc, cur) => {
      const val = cur.evmResult - cur.evmCount;
      return val > 0 ? acc + val : acc;
    }, 0);

    const renderDiff = (row) => {
      const val = row.evmResult - row.evmCount;

      return (
        <Chip
          variant="filled"
          color={val < 0 ? 'primary' : val > 0 ? 'error' : 'success'}
          label={val > 0 ? `+ ${val}` : val < 0 ? `- ${Math.abs(val)}` : val}
          sx={{ fontWeight: 'bold' }}
        />
      );
    };

    const columns = [
      {
        field: 'id',
        headerName: 'S.No',
      },
      { field: 'name', headerName: 'Constituency', width: 200 },
      {
        field: 'electorCount',
        headerName: 'Electors',
        width: 150,
        renderCell: (params) => {
          return numFormat(params.value);
        },
      },
      {
        field: 'evmCount',
        headerName: 'EVM Votes',
        width: 150,
        renderCell: (params) => {
          return numFormat(params.value);
        },
      },
      {
        field: 'postalVotes',
        headerName: 'Postal Votes',
        width: 150,
        renderCell: (params) => {
          return numFormat(params.value);
        },
      },
      {
        field: 'evmResult',
        headerName: 'EVM Result',
        width: 150,
        renderCell: (params) => {
          return numFormat(params.value);
        },
      },
      {
        headerName: 'EVM Difference',
        width: 150,
        renderCell(params) {
          return renderDiff(params.row);
        },
        valueGetter: (value) => {
          return value.row.evmResult - value.row.evmCount;
        },
      },
    ];

    return (
      <Box>
        <Box
          sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <Card variant="outlined" sx={{ m: 1 }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h3">{state.pc.length}</Typography>
              <Typography>CONSTITUENCIES</Typography>
            </CardContent>
          </Card>

          <Card variant="outlined" sx={{ m: 1 }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h3">
                {numFormat(sum(state.pc, ({ electorCount }) => electorCount))}
              </Typography>
              <Typography>ELECTORS</Typography>
            </CardContent>
          </Card>

          <Card variant="outlined" sx={{ m: 1 }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h3">
                {numFormat(sum(state.pc, ({ evmCount }) => evmCount))}
              </Typography>
              <Typography>EVM VOTES</Typography>
            </CardContent>
          </Card>

          <Card variant="outlined" sx={{ m: 1 }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h3">
                {numFormat(sum(state.pc, ({ postalVotes }) => postalVotes))}
              </Typography>
              <Typography>POSTAL VOTES</Typography>
            </CardContent>
          </Card>

          <Card variant="outlined" sx={{ m: 1 }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h3">
                {numFormat(sum(state.pc, ({ evmResult }) => evmResult))}
              </Typography>
              <Typography>EVM RESULT</Typography>
            </CardContent>
          </Card>

          <Card variant="outlined" sx={{ m: 1, border: '1px solid red' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h3" sx={{ textAlign: 'center' }}>
                {numFormat(totalUnCountedVotes)}
              </Typography>
              <Typography sx={{ color: (t) => t.palette.primary.main }}>
                UN-COUNTED EVM VOTES
              </Typography>
            </CardContent>
          </Card>

          <Card variant="outlined" sx={{ m: 1, border: '1px solid red' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h3" sx={{ textAlign: 'center' }}>
                {numFormat(totalOverCountedVotes)}
              </Typography>
              <Typography sx={{ color: (t) => t.palette.error.main }}>
                OVER-COUNTED EVM VOTES
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ mt: 2 }}>
          <DataGrid
            rows={state.pc}
            columns={columns}
            getRowId={(row) => row.name}
            slots={
              {
                // pagination: null,
                // footer: null,
              }
            }
          />
        </Box>
      </Box>
    );
  };

  return (
    <Layout
      title="The Republic of India - General Election - Parliamentary
    Constituencies (2024)"
    >
      <Paper sx={{ p: 2, mt: 2 }}>
        <Box textAlign="center">
          <Typography variant="h5">
            🇮🇳 The Republic of India - General Election - Parliamentary
            Constituencies (2024) Report
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 1 }}>
          <Button variant="contained" disabled size="small">
            <Download /> Download Report
          </Button>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Alert severity="warning" sx={{ mt: 1 }}>
            Work in Progress.
          </Alert>
        </Box>
        <Box
          sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <NumberBox value={ReportData.meta.phases} text="Phases" />
          <NumberBox
            value={ReportData.states.length}
            text="States and Union Territories"
          />
          <NumberBox
            value={ReportData.meta.constituencies}
            text="Constituencies"
          />
          <NumberBox
            value={sum(constituencies, (c) => c.electorCount)}
            text="Electors"
          />
          <NumberBox
            value={unopposedConst.length}
            text="Unopposed Constituencies"
          />
        </Box>
        <HeadingWithDivider title="Votes" sx={{ mt: 2 }} />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            mt: 2,
          }}
        >
          <NumberBox value={totalEvmVotes} text="EVM Votes" />
          <NumberBox value={totalPostalVotes} text="Postal Votes" />
          <NumberBox
            value={totalUnCountedEVMVotes}
            text="Un-Counted EVM Votes"
            variant="error"
          />
          <NumberBox
            value={totalOverCountedEVMVotes}
            text="Over-Counted EVM Votes"
            variant="error"
          />
        </Box>
        <HeadingWithDivider
          title="States and Union Territories"
          sx={{ mt: 4 }}
        />
        <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 2 }}>
          {renderStates()}
        </Box>
        <HeadingWithDivider title="Charts" sx={{ my: 2 }} />
        <Alert severity="info">
          Available only after the complete data set.
        </Alert>
        <HeadingWithDivider title="Schedule" sx={{ mt: 2 }} />
        <Box sx={{ mt: 2 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Phase</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Constituencies</TableCell>
                <TableCell>States</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ReportData.phases.map((ph, i) => (
                <TableRow key={i}>
                  <TableCell>{ph.name}</TableCell>
                  <TableCell>{ph.date}</TableCell>
                  <TableCell align="left">{ph.constituencies}</TableCell>
                  <TableCell align="left">{ph.states}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
        <HeadingWithDivider title="References" sx={{ mt: 2 }} />
        <Box>
          <ul>
            <li>
              <Link href="https://web.archive.org/web/20240525141320/https://elections24.eci.gov.in/docs/WYKXFehhEH.pdf">
                ELECTION COMMISSION OF INDIA - Voter turnout data (Phase 1 - 5)
              </Link>
            </li>
            <li>
              <Link href="https://web.archive.org/web/20240601033258/https://elections24.eci.gov.in/docs/OBRxLpiB0v.pdf">
                ELECTION COMMISSION OF INDIA - Voter turnout data (Phase 6)
              </Link>
            </li>
            <li>
              <Link href="https://web.archive.org/web/20240610162556/https://elections24.eci.gov.in/docs/BnS4hhbvK9.pdf">
                ELECTION COMMISSION OF INDIA - Voter turnout data (Phase 7)
              </Link>
            </li>
            <li>
              <Link href="https://results.eci.gov.in/PcResultGenJune2024/index.htm">
                General Election to Parliamentary Constituencies: Trends &
                Results June-2024
              </Link>
            </li>
          </ul>
        </Box>
        <Alert severity="info" sx={{ mt: 3 }}>
          Please report any data errors by sending an email to{' '}
          <Link href="maito:admin@tharavugal.org">admin@tharavugal.org</Link>.
        </Alert>{' '}
        <Alert severity="info" sx={{ mt: 3 }}>
          Please send your feedback on this report and let us know what else
          data is to be included here.
        </Alert>
      </Paper>
      <DialogWindow
        variant="large"
        onClose={() => setOpen(false)}
        open={open}
        title={state?.name}
      >
        <Box sx={{ mb: 25 }}>{open && renderState()}</Box>
      </DialogWindow>
    </Layout>
  );
}
