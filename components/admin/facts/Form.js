import { Box, Button } from '@mui/material';
import { Form as OTFForm, useFieldArray } from '@opentf/react-form';

import { factsSchema } from '@/schema';
import zodErrors from '@/utils/zodErrors';
import MUITextField from '@/components/forms/MUITextField';
import { useField } from '@opentf/react-form';
// import { Builder } from '@tharavugal/ui-builder';

// function UIBuilderField() {
//   const { field } = useField('ui');
//   console.log(field.value);

//   if (!field.value) {
//     return 'Loading...'
//   }

//   return (
//     <Builder
//       code={field.value.code}
//       data={field.value.data}
//       onSave={(values) => {
//         console.log(values);
//         field.onChange(values);
//       }}
//     />
//   );
// }

export default function Form({ initialValues, onSubmit, update = false }) {
  return (
    <Box>
      <OTFForm
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={(values) => {
          console.log(values);
          return zodErrors(factsSchema, values);
        }}
      >
        <Box mt={1}>
          <MUITextField name="title" label="Title" />
        </Box>
        <Box mt={2}>
          {/* <UIBuilderField /> */}
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
