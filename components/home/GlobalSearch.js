import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Button,
  Tooltip,
  Alert,
  Typography,
  Divider,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';

import DialogWindow from '../DialogWindow';
import HeadingWithDivider from '../HeadingWithDivider';
import { Form } from '@opentf/react-form';
import APIClient from '@/utils/APIClient';
import { useField } from '@opentf/react-form';
import Link from '../app/Link';
import { format } from 'date-fns';

function SearchTextField({ name, ...otherProps }) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const { field } = useField(name);
  return (
    <Box
      ref={inputRef}
      value={field.value}
      onChange={(e) => field.onChange(e.target.value)}
      component="input"
      autoComplete="off"
      placeholder="Type here to search..."
      sx={(theme) => ({
        width: '75%',
        p: 2,
        borderRadius: '20px',
        outline: 'none',
        border: '1px solid',
        borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
        backgroundColor: theme.palette.mode === 'light' ? 'white' : '#1A2027',
        fontSize: '16px',
        color: theme.palette.mode === 'light' ? 'black' : 'white',
        '&:focus': {
          borderColor: theme.palette.primary.main,
        },
      })}
      {...otherProps}
    />
  );
}

function SearchForm({ onSubmit, loading }) {
  return (
    <Box
      component={Form}
      initialValues={{ searchText: '' }}
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onSubmit={onSubmit}
    >
      <SearchTextField name="searchText" />
      <Box sx={{ ml: 2 }}>
        {loading ? (
          <CircularProgress disableShrink />
        ) : (
          <Tooltip title="Search">
            <Button
              color="primary"
              variant="contained"
              size="medium"
              type="submit"
            >
              <SearchIcon />
            </Button>
          </Tooltip>
        )}
      </Box>
    </Box>
  );
}

function Result({ data }) {
  const count = Object.values(data).reduce((acc, prev) => acc + prev.length, 0);

  if (count === 0) {
    return <Alert severity="info">No data.</Alert>;
  }

  const renderRealTimeEvents = () => {
    return (
      <>
        <Divider>Real-Time Events</Divider>
        <Box sx={{ ml: 2 }}>
          {data.events.map((ev, i) => (
            <Box key={i} sx={{ p: 1, mt: 1, border: '1px solid lightgray' }}>
              <Link href={'/events/' + ev.slug}>{ev.title}</Link>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ mt: 1 }}
              >
                {format(new Date(ev.startedAt), 'yyyy-MM-dd')}
              </Typography>
            </Box>
          ))}
        </Box>
      </>
    );
  };

  const renderFoodIngredients = () => {
    return (
      <>
        <Divider>Food Ingredients:</Divider>
        <Box sx={{ ml: 2 }}>
          {data.foodIngredients.map((fi, i) => (
            <Box key={i} sx={{ p: 1, mt: 1, border: '1px solid lightgray' }}>
              <Box component={Link} href={'/food-ingredients/' + fi.slug}>
                {fi.name}
              </Box>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ mt: 1 }}
              >
                {fi.foodType}
              </Typography>
            </Box>
          ))}
        </Box>
      </>
    );
  };

  return (
    <Box>
      {data.events.length > 0 && <Box>{renderRealTimeEvents()}</Box>}
      {data.foodIngredients.length > 0 && (
        <Box sx={{ mt: 2 }}>{renderFoodIngredients()}</Box>
      )}
    </Box>
  );
}

export default function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState({
    events: [],
    resources: [],
    foodIngredients: [],
  });

  const handleSubmit = async (values) => {
    if (values.searchText) {
      setLoading(true);
      const response = await APIClient.get(
        '/api/search?q=' + values.searchText
      );
      setSearchData(response.data);
      setLoading(false);
    }
  };

  return (
    <Box sx={{ my: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box
          onClick={() => setOpen(true)}
          sx={{
            width: { xs: '80%', md: '50%' },
            position: 'relative',
            visibility: open ? 'hidden' : 'visible',
          }}
        >
          <SearchIcon
            color="primary"
            fontSize="large"
            sx={{
              position: 'absolute',
              right: '15px',
              top: '8px',
            }}
          />
          <Box
            component="input"
            readOnly
            autoComplete="off"
            placeholder="Type here to search..."
            sx={(theme) => ({
              width: '100%',
              p: 2,
              borderRadius: '20px',
              outline: 'none',
              border: '1px solid',
              borderColor:
                theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
              backgroundColor:
                theme.palette.mode === 'light' ? 'white' : '#1A2027',
              fontSize: '16px',
              color: theme.palette.mode === 'light' ? 'black' : 'white',
              '&:focus': {
                borderColor: theme.palette.primary.main,
              },
            })}
          />
        </Box>
      </Box>
      <DialogWindow
        title="Global Search"
        variant="large"
        open={open}
        onClose={() => {
          setOpen(false);
          setSearchData({ events: [], resources: [], foodIngredients: [] });
        }}
      >
        <Box>
          <SearchForm onSubmit={handleSubmit} loading={loading} />
          <HeadingWithDivider title="Results" sx={{ my: 2 }} />
          <Result data={searchData} />
        </Box>
      </DialogWindow>
    </Box>
  );
}
