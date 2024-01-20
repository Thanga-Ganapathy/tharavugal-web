import { Box, IconButton, Tooltip } from '@mui/material';
import { Form } from '@opentf/react-form';
import SearchIcon from '@mui/icons-material/Search';
import { Field } from '@opentf/react-form';
import LoadingButton from '@mui/lab/LoadingButton';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { useFormActions } from '@opentf/react-form';
import { useFormContext } from '@opentf/react-form';
import TaInputField from './forms/mui/TaInputField';

export default function SearchForm({
  isLoading,
  onSubmit,
  onClear,
  lang = 'system',
}) {
  function ClearBtn() {
    const { values } = useFormContext();
    const { reset } = useFormActions();

    if (!values.searchText) {
      return null;
    }

    return (
      <Tooltip title="Clear Search">
        <IconButton
          onClick={() => {
            reset();
            if (onClear) {
              onClear();
            }
          }}
        >
          <SearchOffIcon sx={{ color: (t) => t.palette.error.main, mx: 2 }} />
        </IconButton>
      </Tooltip>
    );
  }

  return (
    <Box
      component={Form}
      initialValues={{ searchText: '' }}
      sx={{ width: '100%', display: 'flex', justifyContent: 'center', mb: 1 }}
      onSubmit={onSubmit}
    >
      <TaInputField
        name="searchText"
        lang={lang}
        type="search"
        placeholder="Type here to search..."
      />

      <LoadingButton
        sx={{ ml: 2 }}
        type="submit"
        loading={isLoading}
        loadingPosition="start"
        startIcon={<SearchIcon />}
        variant="contained"
        size="small"
      ></LoadingButton>
      <ClearBtn />
    </Box>
  );
}
