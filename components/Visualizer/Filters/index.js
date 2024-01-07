import { Box, Tab, Tabs } from '@mui/material';
import Basic from './Basic';
import Advanced from './Advanced';
import { useState } from 'react';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function Filters({ onChange }) {
  const [value, setValue] = useState(0);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="events filters tabs"
          centered
        >
          <Tab label="Basic" />
          <Tab label="Advanced" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Basic onChange={onChange} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Advanced />
      </TabPanel>
    </Box>
  );
}
