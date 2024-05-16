import { set } from 'date-fns';
import { v4 as uuid } from 'uuid';
import { produce } from 'immer';

import APIClient from '@/utils/APIClient';
import Form from './Form';
import useAlert from '@/hooks/useAlert';
import { eventsSchema } from '@/schema';
import createDate from '@/utils/createDate';
import { EVENTS_STATUS } from '@/constants';

export default function New({ onClose }) {
  const showAlert = useAlert();
  const defaultTime = set(new Date(), {
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });
  const defaultTz = 'Asia/Kolkata';

  const handleSubmit = async (values) => {
    let data = eventsSchema.safeParse(values).data;
    data = produce(data, (draft) => {
      draft.startedAt = createDate(draft.startDate, draft.startTime);
      draft.endedAt = createDate(draft.endDate, draft.endTime);
      draft.status = EVENTS_STATUS.DRAFT;
      delete draft.startDate;
      delete draft.startTime;
      delete draft.endDate;
      delete draft.endTime;
    });
    const result = await APIClient.post('/api/admin/events', data);
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
        title: '',
        slug: '',
        startDate: new Date(),
        startTime: defaultTime,
        startTz: defaultTz,
        endDate: new Date(),
        endTime: defaultTime,
        endTz: defaultTz,
        categories: [],
        locations: [],
        data: JSON.stringify({ references: [], linkedEvents: [] }, null, 2),
      }}
      onSubmit={handleSubmit}
    />
  );
}
