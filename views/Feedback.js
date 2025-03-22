'use client';

import useAlert from '@/hooks/useAlert';
import APIClient from '@/utils/APIClient';
import { Box, Button } from '@mui/material';
import { Form, Field } from '@opentf/react-form';
import { useState } from 'react';

export default function Feedback() {
  const [sending, setSending] = useState(false);
  const showAlert = useAlert();

  const handleSubmit = async (values, { reset }) => {
    setSending(true);
    values.url = window.location.pathname;
    try {
      await APIClient.post('/api/feedback', values);
      showAlert('success', '🙏 Thanks for your valuable feedback.');
      reset();
    } catch (error) {
      showAlert('error', 'An error occurred. Please try again later.');
    }
    setSending(false);
  };

  return (
    (<Form
      initialValues={{ id: crypto.randomUUID(), msg: '' }}
      onSubmit={handleSubmit}
      validate={(values) => {
        const errors = {};
        if (!values.msg) {
          errors.msg = 'Please enter the msg';
        }
        return errors;
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <Box
          component={Field}
          type="textarea"
          name="msg"
          placeholder="Please type your feedback here..."
          rows={3}
          sx={(theme) => ({
            p: 1,
            width: '300px',
            borderColor: '#2D3843',
            backgroundColor:
              '#1A2027',
            fontSize: '14px',
            color: 'white',
            '&:focus': {
              borderColor: theme.palette.primary.main,
            },
            ...theme.applyStyles("light", {
              borderColor: '#E0E3E7',
              backgroundColor: 'white',
              color: 'black'
            })
          })}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ m: 1 }}
          disabled={sending}
        >
          {sending ? 'Sending...' : 'Send'}
        </Button>
      </Box>
    </Form>)
  );
}
