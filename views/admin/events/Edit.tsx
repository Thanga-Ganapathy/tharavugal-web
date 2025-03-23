import { format, set } from 'date-fns';
import { produce } from 'immer';
import { TZDate } from '@date-fns/tz';
import APIClient from '@/utils/APIClient';
import Form from './Form';
import useAlert from '@/hooks/useAlert';
import { eventsSchema } from '@/schema';
import createDate from '@/utils/createDate';
import { Box, CircularProgress } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';

const getInitialValue = (record) => {
  const startZonedDate = new TZDate(record.startedAt, record.startTz);
  const endZonedDate = new TZDate(record.endedAt, record.endTz);
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

  return initialValues;
};

export default function Edit({ record, mutate }) {
  const [loading, setLoading] = useState(true);
  const [iv, setIv] = useState(null);
  const showAlert = useAlert();

  useEffect(() => {
    console.log(record);

    const fetchData = async () => {
      const res = await APIClient.get('/api/admin/events/' + record.id);
      setIv(getInitialValue(res.data))
      setLoading(false)
    };

    fetchData();
  }, []);

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

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress color="warning" />
      </Box>
    );
  }

  return <Form initialValues={iv} onSubmit={handleSubmit} update />;
}
