import { format, parseISO, set } from 'date-fns';
import { produce } from 'immer';
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';

import APIClient from '@/utils/APIClient';
import Form from './Form';
import useAlert from '@/hooks/useAlert';
import { eventsSchema } from '@/schema';
import createDate from '@/utils/createDate';

export default function Edit({ record, mutate }) {
  const startZonedDate = utcToZonedTime(record.startedAt, record.startTz);
  const endZonedDate = utcToZonedTime(record.endedAt, record.endTz);
  const initialValues = {
    ...record,
    startDate: new Date(format(startZonedDate, 'yyyy-MM-dd')),
    startTime: set(new Date(), {
      hours: startZonedDate.getHours(),
      minutes: startZonedDate.getMinutes(),
      seconds: startZonedDate.getSeconds(),
      milliseconds: startZonedDate.getMilliseconds(),
    }),
    endDate: new Date(format(endZonedDate, 'yyyy-MM-dd')),
    endTime: set(new Date(), {
      hours: endZonedDate.getHours(),
      minutes: endZonedDate.getMinutes(),
      seconds: endZonedDate.getSeconds(),
      milliseconds: endZonedDate.getMilliseconds(),
    }),
    data: JSON.stringify(record.data, null, 2),
  };
  const showAlert = useAlert();

  const handleSubmit = async (values) => {
    let data = eventsSchema.safeParse(values).data;
    data = produce(data, (draft) => {
      draft.startedAt = createDate(draft.startDate, draft.startTime);
      draft.endedAt = createDate(draft.endDate, draft.endTime);
      delete draft.startDate;
      delete draft.startTime;
      delete draft.startUTCOffset;
      delete draft.endDate;
      delete draft.endTime;
      delete draft.endUTCOffset;
    });
    const result = await APIClient.post('/api/admin/events', data, true);
    if (result.ok) {
      showAlert('success', result.data.message);
      mutate();
    } else {
      showAlert('error', result.data ? result.data.message : 'Failed!');
    }
  };

  return <Form initialValues={initialValues} onSubmit={handleSubmit} update />;
}
