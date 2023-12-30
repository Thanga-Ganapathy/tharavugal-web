import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useField } from '@opentf/react-form';

export default function MUISelectField({ name, label, options, multiple }) {
  const { field, error } = useField(name, multiple ? [] : '');

  return (
    <FormControl size="small" fullWidth>
      <InputLabel id="select-label-id">{label}</InputLabel>
      <Select
        error={Boolean(error)}
        labelId="select-label-id"
        value={field.value}
        label={label}
        onChange={(e) => field.onChange(e.target.value)}
        onBlur={field.onBlur}
        multiple={multiple}
      >
        {options.map((o, i) => (
          <MenuItem key={i} value={typeof o === 'string' ? o : o.value}>
            {typeof o === 'string' ? o : o.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
