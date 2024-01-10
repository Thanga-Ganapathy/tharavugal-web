import { useEffect, useState } from 'react';
import { Box, CircularProgress, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Form, Field } from '@opentf/react-form';

export default function SearchForm({
  isLoading,
  initialValues,
  onSubmit,
  placeholder = 'Type here to search...',
}) {
  const [values, setValues] = useState(initialValues || { searchText: '' });

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  return (
    <Box mb={2}>
      <Box
        component={Form}
        initialValues={values}
        sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        onSubmit={onSubmit}
      >
        <Box
          name="searchText"
          type="search"
          component={Field}
          sx={(theme) => ({
            width: { xs: '75%', md: '40%' },
            padding: '15px',
            borderRadius: '20px',
            border: 'none',
            outlineColor: theme.palette.primary.light,
          })}
          placeholder={placeholder}
        />
        <IconButton type="submit">
          {isLoading ? <CircularProgress size={25} /> : <SearchIcon />}
        </IconButton>
      </Box>
    </Box>
  );
}
