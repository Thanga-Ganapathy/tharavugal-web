import { Box, Button } from '@mui/material';
import { Form as OTFForm, useFieldArray } from '@opentf/react-form';

import { thamizhlDictionarySchema } from '@/schema';
import zodErrors from '@/utils/zodErrors';
import MUITextField from '@/components/forms/MUITextField';
import MUITextAreaField from '@/components/forms/MUITextAreaField';
import MUISelectField from '@/components/forms/MUISelectField';

const langOptions = [
  { label: 'Thamizhl', value: 'ta' },
  { label: 'English', value: 'en' },
];

function DefinitionsField() {
  const { fields, push, remove } = useFieldArray('definitions');

  const defFields = fields.map((f, i) => (
    <Box key={i} sx={{ mt: 2 }}>
      <Box>
        <MUISelectField
          options={langOptions}
          name={`${f}.langID`}
          label="Lang"
        />
      </Box>
      <Box>
        <MUITextAreaField name={`${f}.definition`} label="Definition" />
      </Box>
    </Box>
  ));

  return (
    <Box>
      {defFields}
      <Box sx={{ display: 'flex', justifyContent: 'right', mt: 2 }}>
        <Button
          onClick={() => push({ langID: '', definition: '' })}
          size="small"
          variant="outlined"
        >
          New Definition
        </Button>
      </Box>
    </Box>
  );
}

export default function Form({ initialValues, onSubmit, update = false }) {
  return (
    <Box>
      <OTFForm
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={(values) => zodErrors(thamizhlDictionarySchema, values)}
      >
        <Box mt={1}>
          <MUITextField name="word" label="Word" />
        </Box>
        <Box mt={2}>
          <DefinitionsField />
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
