import APIClient from '@/utils/APIClient';
import Form from './Form';
import { v4 as uuid } from 'uuid';
import useAlert from '@/hooks/useAlert';
import { thamizhlDictionarySchema } from '@/schema';

export default function New({ onClose }) {
  const showAlert = useAlert();

  const handleSubmit = async (values) => {
    const result = await APIClient.post(
      '/api/admin/thamizhl-dictionary',
      thamizhlDictionarySchema.safeParse(values).data
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
        word: '',
        definitions: [{ langID: 'ta', definition: '' }],
      }}
      onSubmit={handleSubmit}
    />
  );
}
