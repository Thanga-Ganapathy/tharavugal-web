import { TextField } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useField } from '@opentf/react-form';

export default function MUITimeField({ name, label, ...otherProps }) {
  const { field, error, setValue } = useField(name);
  return (
    <TimePicker
      {...field}
      readOnly={Boolean(otherProps.readOnly)}
      disabled={Boolean(otherProps.disabled)}
      label={label}
      error={Boolean(error)}
      helperText={error}
      onChange={(newValue) => setValue(newValue)}
      format="HH:mm:ss"
      slotProps={{
        textField: { sx: { mt: 2 }, size: 'small' },
      }}
    />
  );
}
