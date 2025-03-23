import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useField } from '@opentf/react-form';

interface MUISelectFieldProps {
  name: string;
  label: string;
  options: Array<string | { label: string; value: string | number }>;
  multiple?: boolean;
}

export default function MUISelectField({ name, label, options, multiple }: MUISelectFieldProps) {
  const { field, error } = useField(name, multiple ? [] : '');

  return (
    <FormControl size="small" fullWidth>
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Select
        error={Boolean(error)}
        labelId={`${name}-label`}
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
