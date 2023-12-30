import APIClient from '@/utils/APIClient';
import Form from './Form';
import { v4 as uuid } from 'uuid';
import useAlert from '@/hooks/useAlert';
import { resourcesSchema } from '@/schema';

export default function New({ onClose }) {
  const showAlert = useAlert();

  const handleSubmit = async (values) => {
    const result = await APIClient.post(
      '/api/admin/resources',
      resourcesSchema.safeParse(values).data
    );
    if (result.ok) {
      showAlert('success', result.data.message);
      onClose();
    } else {
      showAlert('error', result.data ? result.data.message : 'Failed!');
    }
  };

  return (
    <Form
      initialValues={{
        id: uuid(),
        type: '',
        file: '',
        name: '',
        desc: '',
        publicAccess: false,
      }}
      onSubmit={handleSubmit}
    />
  );
}
