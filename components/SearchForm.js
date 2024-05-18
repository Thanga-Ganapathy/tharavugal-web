import { Box, CircularProgress, IconButton, Tooltip } from '@mui/material';
import { Form } from '@opentf/react-form';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { useFormActions } from '@opentf/react-form';
import { useFormContext } from '@opentf/react-form';
import TaInputField from './forms/mui/TaInputField';
import SearchIcon from '@mui/icons-material/Search';

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
        placeholder={
          lang === 'ta' ? 'இங்கே தட்டச்சு செய்யவும்' : 'Type here to search...'
        }
      />

      <Tooltip title="Search">
        <IconButton type="submit" sx={{ ml: 2 }}>
          {isLoading ? (
            <CircularProgress size={25} />
          ) : (
            <SearchIcon color="black" style={{ height: '35px', color: 'black' }} />
          )}
        </IconButton>
      </Tooltip>
      <ClearBtn />
    </Box>
  );
}
