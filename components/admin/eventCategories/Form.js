import { eventCategoriesSchema } from '@/schema';
import zodErrors from '@/utils/zodErrors';
import { Box, Button } from '@mui/material';
import { Form } from '@opentf/react-form';
import MUITextField from '@/components/forms/MUITextField';

export default function EventCategoriesForm({
  initialValues,
  onSubmit,
  update = false,
}) {
  return (
    <Box>
      <Form
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={(values) => zodErrors(eventCategoriesSchema, values)}
      >
        <Box>
          <MUITextField name="name" label="Name" />
        </Box>
        <Box mt={2}>
          <MUITextField name="info" label="Info" />
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
