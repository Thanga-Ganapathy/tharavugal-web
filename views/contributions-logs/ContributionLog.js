'use client';

import DialogWindow from '@/components/DialogWindow';
import ProgressiveImg from '@/components/ProgressiveImg';
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Typography,
} from '@mui/material';
import { format } from 'date-fns';
import { useState } from 'react';

export default function ContributionLog({ data, config }) {
  const [open, setOpen] = useState(false);
  return (
    <>
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
            onClick={() => {
              setOpen(true);
            }}
          >
            View Attachments
          </Button>
        </CardActions>
      </Card>
      <DialogWindow
        open={open}
        onClose={() => setOpen(false)}
        title="Attachments"
      >
        {data.image ? (
          <ProgressiveImg
            src={config.R2_DOMAIN + '/' + data.image}
            alt="Contribution Attachments"
          />
        ) : (
          <Alert severity="info">No attachments found</Alert>
        )}
      </DialogWindow>
    </>
  );
}
