import APIClient from '@/utils/APIClient';
import { TextField, Autocomplete } from '@mui/material';
import { useField } from '@opentf/react-form';
import { useState } from 'react';

export default function MUIAsyncSelectField({ name, label, url, multiple }) {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const { field, error } = useField(name, multiple ? [] : '');

  const fetchOptions = async (val) => {
    if (!val) {
      setOptions([]);
      return;
    }
    setLoading(true);
    const { data } = await APIClient.get(url + '?q=' + val);
    setOptions(data.map((i) => i.name));
    setLoading(false);
  };

  return (
    <Autocomplete
      filterOptions={(x) => x}
      loading={loading}
      multiple={multiple}
      disablePortal
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          error={Boolean(error)}
          helperText={error}
          onChange={(e) => fetchOptions(e.target.value)}
        />
      )}
      size="small"
      value={field.value}
      onChange={(e, v) => field.onChange(v)}
      onBlur={field.onBlur}
      isOptionEqualToValue={(option, val) => {
        if (typeof option === 'string') {
          return option === val;
        }
        return option.value === (typeof val === 'string' ? val : val.value);
      }}
    />
  );
}
