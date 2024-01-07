import { Form } from '@opentf/react-form';
import { format } from 'date-fns';
import { produce } from 'immer';
import { Box, Button } from '@mui/material';

import MUIAsyncSelectField from '@/components/forms/MUIAsyncSelect';
import MUIDateField from '@/components/forms/MUIDateField';
import MUISelectField from '@/components/forms/MUISelectField';
import { useAppState } from '@/store';
import { useEffect } from 'react';
import { useRef } from 'react';

export default function Basic({ onChange }) {
  const filter = useAppState((s) => s.visualizer.filter);
  const initialValues = {
    category: '',
    from: new Date(),
    to: new Date(),
    locations: [],
    view: 'Date',
  };
  const viewOptions = ['Date', 'Week', 'Month', 'Year'];
  const formRef = useRef();

  useEffect(() => {
    formRef.current.actions.reset(filter)
  }, [filter])

  return (
    <Form
      ref={formRef}
      initialValues={initialValues}
      onSubmit={(values) => {
        const data = produce(values, (draft) => {
          draft.from = format(draft.from, 'yyyy-MM-dd');
          draft.to = format(draft.to, 'yyyy-MM-dd');
          draft.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        });
        onChange(data);
      }}
    >
      <Box mt={2}>
        <MUIAsyncSelectField
          name="category"
          label="Event Category"
          url="/api/event-categories"
        />
      </Box>
      <Box mt={2}>
        <MUIDateField name="from" label="From" />
      </Box>
      <Box mt={2}>
        <MUIDateField name="to" label="To" />
      </Box>
      <Box mt={2}>
        <MUIAsyncSelectField
          name="locations"
          label="Locations"
          url="/api/event-locations"
          multiple
        />
      </Box>
      <Box mt={2}>
        <MUISelectField name="view" label="View" options={viewOptions} />
      </Box>
      <Box mt={2}>
        <Button type="submit" variant="contained" fullWidth>
          Generate
        </Button>
      </Box>
    </Form>
  );
}
