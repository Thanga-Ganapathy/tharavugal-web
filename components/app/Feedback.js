import useAlert from '@/hooks/useAlert';
import APIClient from '@/utils/APIClient';
import { Box, Button } from '@mui/material';
import { Form, Field } from '@opentf/react-form';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';

export default function Feedback() {
  const [sending, setSending] = useState(false);
  const showAlert = useAlert();

  const handleSubmit = async (values, { reset }) => {
    setSending(true);
    await APIClient.post('/api/feedback', values);
    setSending(false);
    showAlert('success', '🙏 Thanks for your valuable feedback.');
    reset();
  };

  return (
    <Form
      initialValues={{ id: uuid(), msg: '' }}
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
          sx={{ p: 1, width: '300px' }}
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
    </Form>
  );
}
