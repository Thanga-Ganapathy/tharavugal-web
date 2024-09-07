import APIClient from '@/utils/APIClient';
import Form from './Form';
import useAlert from '@/hooks/useAlert';
import { factsSchema } from '@/schema';

export default function New({ onClose }) {
  const showAlert = useAlert();

  const handleSubmit = async (values) => {
    console.log(values);
    // const result = await APIClient.post(
    //   '/api/admin/facts',
    //   factsSchema.safeParse(values).data
    // );
    // if (result.ok) {
    //   showAlert('success', result.data.message);
    //   onClose();
    // } else {
    //   showAlert('error', result.data ? result.data.message : 'Failed!');
    // }
  };

  return (
    <Form
      initialValues={{
        id: crypto.randomUUID(),
        title: '',
        ui: {
          code: null,
          data: '{}',
        },
      }}
      onSubmit={handleSubmit}
    />
  );
}
