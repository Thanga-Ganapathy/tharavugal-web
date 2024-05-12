import { announcementsSchema } from '@/schema';
import zodErrors from '@/utils/zodErrors';
import { Box, Button } from '@mui/material';
import { Form } from '@opentf/react-form';
import MUITextField from '@/components/forms/MUITextField';
import MUITextAreaField from '@/components/forms/MUITextAreaField';

export default function eventLocationsForm({
  initialValues,
  onSubmit,
  update = false,
}) {
  return (
    <Box>
      <Form
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={(values) => zodErrors(announcementsSchema, values)}
      >
        <Box>
          <MUITextField name="title" label="Title" />
        </Box>
        <Box mt={2}>
          <MUITextAreaField name="desc" label="Desc" />
        </Box>
        <Box mt={2}>
          <MUITextField name="link.text" label="Link Text" />
        </Box>
        <Box mt={2}>
          <MUITextField name="link.url" label="Url" />
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
