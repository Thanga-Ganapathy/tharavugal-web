import { useEffect, useRef } from 'react';
import { Form as OTFForm } from '@opentf/react-form';
import MUITextField from '@/components/forms/MUITextField';
import { Box, Button } from '@mui/material';
import MUIAsyncSelectField from '@/components/forms/MUIAsyncSelect';
import { useRouter } from 'next/router';
import MUIDateField from '@/components/forms/MUIDateField';
import MUISelectField from '@/components/forms/MUISelectField';
import { isArr } from '@opentf/std';

export default function Form({ initialValues, onSubmit }) {
  const router = useRouter();
  const formRef = useRef(null);

  useEffect(() => {
    if (router.query) {
      let values = { ...initialValues };
      if (router.query.location) {
        values.locations = isArr(router.query.location)
          ? router.query.location
          : [router.query.location];
      }
      if (router.query.tag) {
        values.tags = isArr(router.query.tag)
          ? router.query.tag
          : [router.query.tag];
      }
      formRef.current.actions.reset(values);
      onSubmit(values);
    }
  }, [router.query]);

  return (
    <OTFForm initialValues={initialValues} onSubmit={onSubmit} ref={formRef}>
      <MUITextField name="text" label="Search text" />

      <Box mt={2}>
        <MUIAsyncSelectField
          name="tags"
          label="Tags"
          url="/api/event-categories"
          multiple
        />
      </Box>

      <Box mt={2}>
        <MUISelectField
          name="tagsMatch"
          label="Tags Match"
          options={['Match All', 'Match Any']}
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
        <MUISelectField
          name="locationsMatch"
          label="Locations Match"
          options={['Match All', 'Match Any']}
        />
      </Box>

      <Box mt={2}>
        <MUIDateField name="from" label="From" />
      </Box>

      <Box mt={2}>
        <MUIDateField name="to" label="To" />
      </Box>

      <Box mt={2}>
        <MUISelectField
          name="sort"
          label="Sort"
          options={['Ascending', 'Descending']}
        />
      </Box>

      <Button
        variant="contained"
        size="medium"
        fullWidth
        sx={{ mt: 2 }}
        type="submit"
      >
        Filter
      </Button>
    </OTFForm>
  );
}
