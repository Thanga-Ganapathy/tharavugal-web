import { Box, Button, TextField } from '@mui/material';
import { Form, useField, useFormContext } from '@opentf/react-form';

import { eventsSchema } from '@/schema';
import zodErrors from '@/utils/zodErrors';
import CodeInputField from '@/components/forms/CodeInputField';
import MUITextField from '@/components/forms/MUITextField';
import MUIDateField from '@/components/forms/MUIDateField';
import MUITimeField from '@/components/forms/MUITimeField';
import MUIAutoCompleteField from '@/components/forms/MUIAutoCompleteField';
import MUIAsyncSelectField from '@/components/forms/MUIAsyncSelect';
import { useEffect } from 'react';

function slugify(str, locations, id) {
  let out =
    str.replaceAll('.', '-').replaceAll(',', '').trim() +
    ' ' +
    locations.join(' ') +
    ' ' +
    id.split('-')[0];
  out = out.replaceAll(' ', '-');
  out = out.replaceAll('"', '');
  out = out.replaceAll("'", '');
  return out.toLowerCase();
}

function SlugField({ name, label }) {
  const { field } = useField(name);
  const { values } = useFormContext();

  useEffect(() => {
    field.onChange(slugify(values.title, values.locations, values.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.title, values.locations]);

  return (
    <TextField
      InputProps={{ readOnly: true }}
      fullWidth
      size="small"
      label={label}
      sx={{ mt: 2 }}
      value={field.value}
    />
  );
}

export default function EventsForm({
  initialValues,
  onSubmit,
  update = false,
}) {
  const tzOptions = Intl.supportedValuesOf('timeZone');
  const index = tzOptions.indexOf('Asia/Calcutta');

  if (index !== -1) {
    tzOptions[index] = 'Asia/Kolkata';
  }

  return (
    <Box>
      <Form
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={(values) => zodErrors(eventsSchema, values)}
      >
        <Box>
          <MUITextField name="title" label="Title" />
        </Box>
        <Box>
          <SlugField name="slug" label="Slug" />
        </Box>
        <Box mt={2}>
          <MUIDateField name="startDate" label="Start Date" />
        </Box>
        <Box mt={2}>
          <MUITimeField name="startTime" label="Start Time" />
        </Box>
        <Box mt={2}>
          <MUIAutoCompleteField
            name="startTz"
            label="Start Tz"
            options={tzOptions}
          />
        </Box>
        <Box mt={2}>
          <MUIDateField name="endDate" label="End Date" />
        </Box>
        <Box mt={2}>
          <MUITimeField name="endTime" label="End Time" />
        </Box>
        <Box mt={2}>
          <MUIAutoCompleteField
            name="endTz"
            label="End Tz"
            options={tzOptions}
          />
        </Box>
        <Box mt={2}>
          <MUIAsyncSelectField
            name="categories"
            label="Categories"
            url="/api/event-categories"
            multiple
          />
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
          <CodeInputField name="data" lang="JSON" label="Data" />
        </Box>
        <Box mt={2}>
          <Button variant="contained" size="small" type="submit">
            {update ? 'Update' : 'Add'}
          </Button>
        </Box>
      </Form>
    </Box>
  );
}
