import APIClient from '@/utils/APIClient';
import Form from './Form';
import useAlert from '@/hooks/useAlert';
import { locationsSchema } from '@/schema';

const iv = { id: crypto.randomUUID(), name: '', type: '', parentId: null }

export default function New({ onClose }) {
  const showAlert = useAlert();

  const handleSubmit = async (values) => {
    const result = await APIClient.post(
      '/api/admin/locations',
      locationsSchema.safeParse(values).data
    );
    if (result.ok) {
      showAlert('success', result.data.message);
      onClose();
    } else {
      showAlert('error', result.data ? result.data.message : 'Failed!');
    }
  };

  return (
    <Form initialValues={iv} onSubmit={handleSubmit} />
  );
}
