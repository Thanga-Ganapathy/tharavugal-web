import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Tooltip,
} from '@mui/material';
import { Form, Field } from '@opentf/react-form';
import SearchIcon from '@mui/icons-material/Search';

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
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
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
            outline: 'none',
            border: '1px solid',
            borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
            backgroundColor:
              theme.palette.mode === 'light' ? 'white' : '#1A2027',
            fontSize: '16px',
            color: theme.palette.mode === 'light' ? 'black' : 'white',
            '&:focus': {
              borderColor: theme.palette.primary.main,
            },
          })}
          placeholder={placeholder}
        />
        <Tooltip title="Search" sx={{ ml: 2 }}>
          <Button
            color="primary"
            variant="contained"
            size="medium"
            type="submit"
          >
            {isLoading ? (
              <CircularProgress sx={{ color: 'white' }} size={25} />
            ) : (
              <SearchIcon />
            )}
          </Button>
        </Tooltip>
      </Box>
    </Box>
  );
}
