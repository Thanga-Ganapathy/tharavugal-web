import { Box, Button, Tooltip } from '@mui/material';
import { Form } from '@opentf/react-form';
import { useFormActions } from '@opentf/react-form';
import { useFormContext } from '@opentf/react-form';
import TaInputField from './forms/mui/TaInputField';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchForm({ onSubmit, onClear, lang = 'system' }) {
  function ClearBtn() {
    const { values } = useFormContext();
    const { reset } = useFormActions();

    if (!values.searchText) {
      return null;
    }

    return (
      <Button
        color="secondary"
        onClick={() => {
          reset();
          if (onClear) {
            onClear();
          }
        }}
        type="button"
      >
        Clear Search
      </Button>
    );
  }

  return (
    <Box
      component={Form}
      initialValues={{ searchText: '' }}
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mb: 1,
      }}
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
        <Button variant="contained" size="medium" type="submit" sx={{ ml: 2 }}>
          <SearchIcon />
        </Button>
      </Tooltip>
      <ClearBtn />
    </Box>
  );
}
