import APIClient from '@/utils/APIClient';
import Form from './Form';
import useAlert from '@/hooks/useAlert';
import { foodIngredientsSchema } from '@/schema';

export default function New({ onClose }) {
  const showAlert = useAlert();

  const handleSubmit = async (values) => {
    const result = await APIClient.post(
      '/api/food-ingredients',
      foodIngredientsSchema.safeParse(values).data
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
        id: crypto.randomUUID(),
        name: '',
        manufacturer: '',
        foodType: '',
        slug: '',
        originCountry: '',
        image: '',
        pkg: {
          materials: [],
          bioDegradeable: false,
        },
        items: [{ name: '', ingredients: [] }],
        traces: [],
        data: JSON.stringify({}, null, 2),
      }}
      onSubmit={handleSubmit}
    />
  );
}
