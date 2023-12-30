import { Box, Button } from '@mui/material';
import { Form as OTFForm } from '@opentf/react-form';

import { resourcesSchema } from '@/schema';
import zodErrors from '@/utils/zodErrors';
import UploadField from '@/components/forms/mui/UploadField';
import MUITextField from '@/components/forms/MUITextField';
import MUITextAreaField from '@/components/forms/MUITextAreaField';
import MUISelectField from '@/components/forms/MUISelectField';
import { useFormContext } from '@opentf/react-form';
import SwitchField from '@/components/forms/mui/SwitchField';

const resourceTypePaths = {
  1: 'images',
  2: 'videos',
  3: 'audios',
  4: 'documents',
  5: 'books',
  6: 'others',
};

function FileUploadField() {
  const { values } = useFormContext();
  const uploadPath = `resources/${resourceTypePaths[values.type]}`;

  return (
    <UploadField
      name="file"
      label="File"
      uploadPath={uploadPath}
      disabled={typeof values.type === 'number' ? false : true}
    />
  );
}

export default function Form({ initialValues, onSubmit, update = false }) {
  const resourceTypeOptions = [
    { label: 'Image', value: 1 },
    { label: 'Video', value: 2 },
    { label: 'Audio', value: 3 },
    { label: 'Document', value: 4 },
    { label: 'Book', value: 5 },
    { label: 'Other', value: 6 },
  ];

  return (
    <Box>
      <OTFForm
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={(values) => zodErrors(resourcesSchema, values)}
      >
        <Box mt={1}>
          <MUISelectField
            name="type"
            label="Type"
            options={resourceTypeOptions}
          />
        </Box>
        <Box mt={2}>
          <FileUploadField />
        </Box>
        <Box mt={2}>
          <UploadField
            name="thumb"
            label="Thumb"
            uploadPath="resources/thumb"
          />
        </Box>
        <Box mt={2}>
          <MUITextField name="name" label="Name" />
        </Box>
        <Box mt={2}>
          <MUITextAreaField name="desc" label="Desc" />
        </Box>
        <Box mt={2}>
          <SwitchField name="publicAccess" label="Public Access" />
        </Box>
        <Box mt={2}>
          <Button variant="contained" size="small" type="submit">
            {update ? 'Update' : 'Add'}
          </Button>
        </Box>
      </OTFForm>
    </Box>
  );
}
