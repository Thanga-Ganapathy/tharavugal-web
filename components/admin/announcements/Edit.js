import APIClient from '@/utils/APIClient';
import Form from './Form';
import useAlert from '@/hooks/useAlert';
import { announcementsSchema } from '@/schema';
import { useState, useEffect } from 'react';

export default function Edit({ record }) {
  const [state, setState] = useState({ loading: true, initialValues: null });
  const showAlert = useAlert();

  const fetchRecord = async () => {
    const result = await APIClient.get('/api/admin/announcements/' + record.id);
    const initialValues = {
      ...result.data,
    };
    setState({ loading: false, initialValues });
  };

  useEffect(() => {
    fetchRecord();
  }, []);

  const handleSubmit = async (values) => {
    const result = await APIClient.post(
      '/api/admin/announcements',
      announcementsSchema.safeParse(values).data,
      true
    );
    if (result.ok) {
      showAlert('success', result.data.message);
    } else {
      showAlert('error', result.data ? result.data.message : 'Failed!');
    }
  };

  if (state.loading) {
    return 'Loading...';
  }

  return (
    <Form initialValues={state.initialValues} onSubmit={handleSubmit} update />
  );
}
