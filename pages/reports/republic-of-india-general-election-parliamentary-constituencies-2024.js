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
  Typography,
} from '@mui/material';
import ReportData from '@/data/reports/lok-saba-2024-evm-report';
import DialogWindow from '@/components/DialogWindow';
import { useState } from 'react';
import HeadingWithDivider from '@/components/HeadingWithDivider';
import { Download } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import { sum } from '@opentf/std';

export default function Report() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState(null);

  const renderStates = () => {
    return ReportData.map((s, i) => (
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
        <CardContent>
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
      { field: 'name', headerName: 'Constituency', width: 150 },
      { field: 'electorCount', headerName: 'Electors', width: 150 },
      { field: 'evmCount', headerName: 'EVM Votes', width: 150 },
      { field: 'postalVotes', headerName: 'Postal Votes', width: 150 },
      { field: 'evmResult', headerName: 'EVM Result', width: 150 },
      {
        headerName: 'EVM Difference',
        width: 150,
        renderCell(params) {
          return renderDiff(params.row);
        },
        valueGetter: (value, row) => {
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
                {sum(state.pc, ({ electorCount }) => electorCount)}
              </Typography>
              <Typography>ELECTORS</Typography>
            </CardContent>
          </Card>

          <Card variant="outlined" sx={{ m: 1 }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h3">
                {sum(state.pc, ({ evmCount }) => evmCount)}
              </Typography>
              <Typography>EVM VOTES</Typography>
            </CardContent>
          </Card>

          <Card variant="outlined" sx={{ m: 1 }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h3">
                {sum(state.pc, ({ postalVotes }) => postalVotes)}
              </Typography>
              <Typography>POSTEL VOTES</Typography>
            </CardContent>
          </Card>

          <Card variant="outlined" sx={{ m: 1 }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h3">
                {sum(state.pc, ({ evmResult }) => evmResult)}
              </Typography>
              <Typography>EVM RESULT</Typography>
            </CardContent>
          </Card>

          <Card variant="outlined" sx={{ m: 1 }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h3" sx={{ textAlign: 'center' }}>
                {totalUnCountedVotes}
              </Typography>
              <Typography sx={{ color: (t) => t.palette.primary.main }}>
                UN-COUNTED EVM VOTES
              </Typography>
            </CardContent>
          </Card>

          <Card variant="outlined" sx={{ m: 1 }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h3" sx={{ textAlign: 'center' }}>
                {totalOverCountedVotes}
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
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" disabled size="small">
            <Download /> Download Report
          </Button>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Alert severity="warning" sx={{ mt: 1 }}>
            WIP: Currently, only two states have been done.
          </Alert>
        </Box>
        <HeadingWithDivider title="States" sx={{ mt: 2 }} />
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>{renderStates()}</Box>
        <HeadingWithDivider title="Charts" sx={{ my: 2 }} />
        <Alert severity="info">
          Available only after the complete data set.
        </Alert>
        <HeadingWithDivider title="References" sx={{ mt: 2 }} />
        <Box>
          <ul>
            <li>
              <Link href="https://web.archive.org/web/20240525141320/https://elections24.eci.gov.in/docs/WYKXFehhEH.pdf">
                ELECTION COMMISSION OF INDIA - Voter turnout data
              </Link>
            </li>
            <li>
              <Link href="https://results.eci.gov.in/">
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
