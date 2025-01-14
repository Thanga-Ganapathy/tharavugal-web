import { useCallback, useState } from 'react';
import APIClient from '@/utils/APIClient';
import { TextField, Autocomplete } from '@mui/material';
import { useField } from '@opentf/react-form';
import { debounce } from 'lodash';

export default function MUIAsyncSelectField({
  name, label, url, multiple, optionLabel = 'name', optionValue = 'id'
}) {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const { field, error } = useField(name, multiple ? [] : '');

  // Debounced fetch function to prevent too many API calls
  const fetchOptions = useCallback(
    debounce(async (val) => {
      if (!val) {
        setOptions([]);
        return;
      }

      try {
        setLoading(true);
        const { data } = await APIClient.get(`${url}?q=${val}`);
        setOptions(data); // Now we store the entire objects
      } catch (err) {
        console.error('Failed to fetch options:', err);
        setOptions([]);
      } finally {
        setLoading(false);
      }
    }, 500),
    [url]
  );

  return (
    <Autocomplete
      filterOptions={(x) => x} // Prevents default filtering behavior
      loading={loading}
      multiple={multiple}
      disablePortal
      options={options}
      getOptionLabel={(option) => option[optionLabel] || ''} // Display the label from the object
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
      onChange={(e, v) => field.onChange(v)} // Return selected objects
      onBlur={field.onBlur}
      isOptionEqualToValue={(option, val) => {
        // Compare by optionValue (e.g., id or another unique field)
        return option[optionValue] === (val ? val[optionValue] : null);
      }}
    />
  );
}
