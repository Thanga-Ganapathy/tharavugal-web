import { locationsSchema } from '@/schema';
import zodErrors from '@/utils/zodErrors';
import { Box, Button } from '@mui/material';
import { Form } from '@opentf/react-form';
import MUITextField from '@/components/forms/MUITextField';
import MUISelectField from '@/components/forms/MUISelectField';
import AsyncSelect from '@/components/forms/AsyncSelect';

const LOCATION_TYPES = [
  'Region',
  'Country',
  'State',
  'District',
  'City',
  'Neighborhood',
  'Village',
  'Area',
  'Street',
];

export default function LocationsForm({
  initialValues,
  onSubmit,
  update = false,
}) {
  return (
    <Box>
      <Form
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={(values) => zodErrors(locationsSchema, values)}
      >
        <Box>
          <MUITextField name="name" label="Name" />
        </Box>

        <Box sx={{ mt: 2 }}>
          <MUISelectField name="type" label="Type" options={LOCATION_TYPES} />
        </Box>

        <Box sx={{ mt: 2 }}>
          <AsyncSelect
            name="parentId"
            label="Parent"
            url={`/api/admin/locations`}
          />
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
