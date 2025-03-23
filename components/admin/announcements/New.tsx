import APIClient from '@/utils/APIClient';
import Form from './Form';
import useAlert from '@/hooks/useAlert';
import { announcementsSchema } from '@/schema';

interface NewProps {
  onClose: () => void;
}

export default function New({ onClose }: NewProps) {
  const showAlert = useAlert();

  const handleSubmit = async (values: Record<string, any>) => {
    const result = await APIClient.post(
      '/api/admin/announcements',
      announcementsSchema.safeParse(values).data
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
        title: '',
        desc: '',
        link: { text: '', url: '/' },
      }}
      onSubmit={handleSubmit}
    />
  );
}
