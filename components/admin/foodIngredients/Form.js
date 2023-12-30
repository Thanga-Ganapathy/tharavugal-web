import { Box, Button } from '@mui/material';
import { Form as OTFForm } from '@opentf/react-form';
import { foodIngredientsSchema } from '@/schema';
import zodErrors from '@/utils/zodErrors';
import UploadField from '@/components/forms/mui/UploadField';
import MUITextField from '@/components/forms/MUITextField';
import CodeInputField from '@/components/forms/CodeInputField';
import MUISelectField from '@/components/forms/MUISelectField';
import { countries } from '@/data/countries';
import { foodIngredientsData } from '@/data/foodIngredients';
import SwitchField from '@/components/forms/mui/SwitchField';
import MultiSelectField from '@/components/forms/mui/MultiSelectField';
import { useFieldArray } from '@opentf/react-form';

const ItemsField = () => {
  const { fields, push, remove } = useFieldArray('items');
  const items = fields.map((f, i) => (
    <fieldset style={{ marginTop: '10px' }} key={i}>
      <legend>Item - {i + 1}</legend>
      <Box>
        <MUITextField name={`${f}.name`} label="Name" />
      </Box>

      <Box mt={2}>
        <MultiSelectField
          name={`${f}.ingredients`}
          label="Ingredients"
          options={foodIngredientsData.ingredients}
        />
      </Box>

      <br />
      <button type="button" onClick={() => remove(i)}>
        ❌ Remove
      </button>
      <br />
    </fieldset>
  ));
  return (
    <Box>
      <Box>{items}</Box>
      <br />
      <button type="button" onClick={() => push({ name: '', ingredients: [] })}>
        Add Item
      </button>
    </Box>
  );
};

export default function Form({ initialValues, onSubmit, update = false }) {
  return (
    <Box>
      <OTFForm
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={(values) => zodErrors(foodIngredientsSchema, values)}
      >
        <Box>
          <MUITextField name="name" label="Name" />
        </Box>

        <Box>
          <MUITextField name="manufacturer" label="Manufacturer" />
        </Box>

        <Box mt={2}>
          <MUISelectField
            name="foodType"
            label="Food Type"
            options={foodIngredientsData.types}
          />
        </Box>

        <Box>
          <MUITextField name="slug" label="Slug" />
        </Box>

        <Box mt={2}>
          <MUISelectField
            multiple
            name="categories"
            label="Categories"
            options={foodIngredientsData.categories}
          />
        </Box>

        <Box mt={2}>
          <MUISelectField
            name="originCountry"
            label="Origin Country"
            options={countries.map((c) => c.official)}
          />
        </Box>

        <Box mt={2}>
          <MUISelectField
            multiple
            name="pkg.materials"
            label="Package Materials"
            options={foodIngredientsData.pkgMaterials}
          />
        </Box>

        <Box mt={2}>
          <SwitchField name="pkg.bioDegradeable" label="Bio Degradeable" />
        </Box>

        <Box mt={2}>
          <UploadField
            name="image"
            label="Image"
            uploadPath="food_ingredients"
          />
        </Box>

        <Box mt={2}>
          <UploadField
            name="thumb"
            label="Thumb"
            uploadPath="food_ingredients"
          />
        </Box>

        <Box>
          <ItemsField />
        </Box>

        <Box mt={2}>
          <MultiSelectField
            name="traces"
            label="Traces"
            options={foodIngredientsData.ingredients}
          />
        </Box>

        <Box mt={2}>
          <CodeInputField name="data" />
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
