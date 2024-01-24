import DialogWindow from '@/components/DialogWindow';
import ProgressiveImg from '@/components/ProgressiveImg';
import Layout from '@/components/layouts/DefaultLayout';
import { connect } from '@/utils/db';
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Paper,
  Typography,
} from '@mui/material';
import { format } from 'date-fns';
import { useState } from 'react';

function ContributionLog({ data, setState }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{data.title}</Typography>
        <Typography
          variant="subtitle2"
          sx={{ fontSize: '12px', color: 'text.secondary' }}
        >
          <strong>Date:</strong>{' '}
          {format(new Date(data.contributionDate), 'yyyy-MM-dd')}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Contributors:</Typography>
          {data.contributors.map((c, i) => (
            <Box sx={{ mt: 2 }} key={i}>
              <table>
                <tbody>
                  <tr>
                    <td>Name: </td>
                    <td>{c.name}</td>
                  </tr>
                  <tr>
                    <td>Role: </td>
                    <td>
                      <Chip label={c.role} size="small" color="secondary" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </Box>
          ))}
        </Box>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'right' }}>
        <Button
          variant="outlined"
          size="small"
          onClick={() =>
            setState((state) => ({ ...state, src: data.image, open: true }))
          }
        >
          View Attachments
        </Button>
      </CardActions>
    </Card>
  );
}

export default function ContributionLogs({ logs, R2_DOMAIN }) {
  const [state, setState] = useState({ open: false, src: null });

  return (
    <Layout title="Contribution Logs">
      <Box textAlign="center">
        <Typography variant="h5">Contribution Logs</Typography>
      </Box>
      <Box mt={2}>
        <Alert severity="info">
          Contributions made by people to the organization are logged in the
          system, so you can view all types (except a few) of contributions
          here.
        </Alert>
      </Box>
      <Box mt={2} sx={{ p: { xs: 1, sm: 1, md: 2 } }}>
        {logs.map((log) => (
          <ContributionLog key={log.id} data={log} setState={setState} />
        ))}
      </Box>
      <DialogWindow
        open={state.open}
        onClose={() => setState({ ...state, src: null, open: false })}
        title="Attachments"
      >
        {state.src ? (
          <ProgressiveImg
            src={R2_DOMAIN + '/' + state.src}
            alt="Contribution Attachments"
          />
        ) : (
          <Alert severity="info">No attachments found</Alert>
        )}
      </DialogWindow>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const db = await connect();
  const col = db.collection('contribution-logs');
  const cursor = col.find(
    {},
    {
      projection: {
        _id: 0,
      },
    }
  );

  const logs = JSON.parse(JSON.stringify(await cursor.toArray()));
  return {
    props: {
      logs,
      R2_DOMAIN: process.env.R2_DOMAIN,
    },
  };
}
