import {
  Box,
  Button,
  Card,
  CardContent,
  Alert,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Tooltip,
  Chip,
  AlertTitle,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Form } from '@opentf/react-form';
import MiniSearch from 'minisearch';
import searchIndex from '@/data/thirukkural/searchIndex.json';
import { useField } from '@opentf/react-form';
import { useState } from 'react';
import { sort } from '@opentf/std';
import { useId } from 'react';
import { isEmpty } from '@opentf/std';
import { TaInput } from '@opentf/react-ta-input';
import { useRef } from 'react';
import { useEffect } from 'react';
import { arrReplace } from '@opentf/std';
import DialogWindow from '../DialogWindow';
import HeadingWithDivider from '../HeadingWithDivider';
import { thirukkural } from '@/data/thirukkural/index';
import Link from '../app/Link';

const miniSearch = MiniSearch.loadJSON(JSON.stringify(searchIndex), {
  fields: ['name', 'nameEn', 'text', 'textEn', 'textEnExp'],
  searchOptions: { prefix: true },
});

function SearchInputField({ name, lang }) {
  const inputRef = useRef();
  const [anchorEl, setAnchorEl] = useState(null);
  const [options, setOptions] = useState([]);
  const { field } = useField(name);
  const id = useId();

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (field.value) {
      const term = field.value.split(' ').at(-1);
      const list = miniSearch.autoSuggest(term);
      let opts = new Set();
      for (const obj of list) {
        for (const term of obj.terms) {
          if (!opts.has(term)) {
            opts.add(term);
          }

          if (opts.size >= 5) {
            break;
          }
        }
      }
      opts = sort([...opts].slice(0, 5), 'asc');
      setOptions(opts);
    } else {
      setOptions([]);
    }
  }, [field.value]);

  return (
    <Box
      lang={lang}
      component={TaInput}
      inputRef={inputRef}
      onChange={field.onChange}
      sx={{ width: { xs: '75%', md: '75%' } }}
    >
      <Box
        ref={inputRef}
        autoFocus={true}
        component="input"
        autoComplete="off"
        placeholder="தேடுக | Search"
        onFocus={(e) => setAnchorEl(e.currentTarget)}
        onBlur={(e) => {
          if (e.relatedTarget?.role !== 'menuitem') {
            setAnchorEl(null);
          }
        }}
        value={field.value}
        sx={(theme) => ({
          width: '100%',
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
      />
      {/* <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {options.map((l, i) => (
          <MenuItem
            key={i}
            onClick={() => {
              field.onChange(l);
              handleClose();
            }}
          >
            {l}
          </MenuItem>
        ))}
      </Menu> */}
      <Popper
        id={id}
        open={Boolean(anchorEl) && !isEmpty(options)}
        anchorEl={anchorEl}
        placement="bottom-start"
        sx={{ p: 0 }}
        disablePortal={true}
      >
        <Paper sx={{ p: 0 }}>
          <MenuList>
            {options.map((l, i) => (
              <MenuItem
                key={i}
                onClick={() => {
                  const v = arrReplace(field.value.split(' '), null, 1, l).join(
                    ' '
                  );
                  field.onChange(v);
                  handleClose();
                }}
              >
                {l}
              </MenuItem>
            ))}
          </MenuList>
        </Paper>
      </Popper>
    </Box>
  );
}

function ResultBox({ id }) {
  const chapterNo = Math.ceil(id / 10) - 1;
  const kuralNo = (id % 10) - 1;
  const chapter = thirukkural.chapters[chapterNo];
  const kural = chapter.kurals.at(kuralNo);

  return (
    <Card sx={{ mb: 2 }} variant="outlined">
      <CardContent>
        <Link href={`/thirukkural/chapters/${chapter.slug}/${id}`}>
          <Box
            component="div"
            dangerouslySetInnerHTML={{
              __html: kural.translations[0].explanations[0].text,
            }}
          />
        </Link>
        <Box sx={{ textAlign: 'right', mt: 1 }}>
          <Chip
            size="small"
            color="info"
            label={`${chapter.name} - ${chapter.translations[0].text}`}
          />
        </Box>
      </CardContent>
    </Card>
  );
}

export default function Search() {
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState([]);

  const handleSubmit = (values) => {
    const list = miniSearch.search(values.searchText);
    setResult(list);
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
            placeholder="தேடுக | Search"
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
        title="Search"
        variant="large"
        open={open}
        onClose={() => {
          setOpen(false);
          setResult([]);
        }}
      >
        <Box>
          <Box
            component={Form}
            initialValues={{ searchText: '' }}
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onSubmit={handleSubmit}
          >
            <SearchInputField name="searchText" lang="ta" />
            <Tooltip title="Search" sx={{ ml: 2 }}>
              <Button
                color="primary"
                variant="contained"
                size="medium"
                type="submit"
              >
                <SearchIcon />
              </Button>
            </Tooltip>
          </Box>
          <Box
            sx={{
              mt: 4,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box component="span" sx={{ mr: 2 }}>
              Try:{' '}
            </Box>{' '}
            <Chip
              sx={{ mx: 1 }}
              color="secondary"
              variant="outlined"
              label="கல்வி"
            />
            <Chip
              sx={{ mx: 1 }}
              color="secondary"
              variant="outlined"
              label="Elephant"
            />
            <Chip
              sx={{ mx: 1 }}
              color="secondary"
              variant="outlined"
              label="காதல்"
            />
          </Box>
          <HeadingWithDivider
            title={`Results ${result.length > 0 ? `(${result.length})` : ''}`}
            sx={{ my: 2 }}
          />
          {result.map((r, i) => (
            <ResultBox key={i} id={r.id} />
          ))}
          {isEmpty(result) && (
            <Alert severity="info">
              <AlertTitle>No result.</AlertTitle>
              You can use the Virtual Keyboard by clicking the icon below the
              search bar.
              <br />
              <br />
              You can also change the default Thamizhl (தமிழ்) input to System
              input.
            </Alert>
          )}
        </Box>
      </DialogWindow>
    </Box>
  );
}
