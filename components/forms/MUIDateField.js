import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useField } from '@opentf/react-form';

export default function MUIDateField({ name, label, ...otherProps }) {
  const { field, error, setValue } = useField(name, null);

  return (
    <DatePicker
      {...field}
      readOnly={Boolean(otherProps.readOnly)}
      disabled={Boolean(otherProps.disabled)}
      label={label}
      error={Boolean(error)}
      helperText={error}
      onChange={(newValue) => setValue(newValue)}
      format="yyyy-MM-dd"
      slotProps={{
        textField: { sx: { mt: 2 }, size: 'small' },
        field: { clearable: true },
      }}
    />
  );
}
