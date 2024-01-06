import { useEffect, useState } from 'react';
import { Box, Paper, Typography, Alert, Tabs, Tab } from '@mui/material';
import { useRouter } from 'next/router';

import Layout from '@/components/layouts/DefaultLayout';
import SearchForm from '@/components/SearchForm';
import APIClient from '@/utils/APIClient';
import Link from 'next/link';
import { format } from 'date-fns';
import Resource from '@/components/Resource';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </Box>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Search({ data }) {
  const [isLoading, setIsLoading] = useState(false);
  const [searchData, setSearchData] = useState({
    events: [],
    resources: [],
    foodIngredients: [],
  });
  const router = useRouter();

  const [value, setValue] = useState(0);

  const handleChange = (_e, newValue) => {
    setValue(newValue);
  };

  async function fetchData(query) {
    if (!query) {
      return;
    }
    setIsLoading(true);
    const response = await APIClient.get('/api/search?q=' + query);
    setSearchData(response.data);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData(router.query.q);
  }, [router.query.q]);

  const renderRealTimeEvents = () => {
    return (
      <>
        <Typography variant="h6">Real-Time Events:</Typography>
        <Box sx={{ ml: 2 }}>
          {searchData.events.map((ev, i) => (
            <Box key={i} sx={{ p: 1, mt: 1, border: '1px solid lightgray' }}>
              <Box component={Link} href={'/events/' + ev.slug}>
                {ev.title}
              </Box>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ mt: 1 }}
              >
                Date: {format(new Date(ev.startedAt), 'yyyy-MM-dd')}
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
        <Typography variant="h6">Food Ingredients:</Typography>
        <Box sx={{ ml: 2 }}>
          {searchData.foodIngredients.map((fi, i) => (
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

  const renderNoData = () => {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Alert severity="info">No result</Alert>
      </Box>
    );
  };

  const renderResources = (type) => {
    const resources = searchData.resources.filter((r) => r.type === type);
    if (resources.length === 0) {
      return renderNoData();
    }

    const resArr = resources.map((im, i) => (
      <Resource data={im} key={i} domain={data.constants.R2_DOMAIN} />
    ));

    return <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>{resArr}</Box>;
  };

  const renderPrimary = () => {
    if (
      searchData.events.length === 0 &&
      searchData.foodIngredients.length === 0
    ) {
      return renderNoData();
    }

    return (
      <>
        {searchData.events.length > 0 && <Box>{renderRealTimeEvents()}</Box>}
        {searchData.foodIngredients.length > 0 && (
          <Box sx={{ mt: 2 }}>{renderFoodIngredients()}</Box>
        )}
      </>
    );
  };

  return (
    <Layout title="Search">
      <SearchForm
        isLoading={isLoading}
        initialValues={{ searchText: router.query.q }}
        onSubmit={(values) => fetchData(values.searchText)}
      />
      <Paper sx={{ p: { xs: 1, sm: 1, md: 2 }, minHeight: '300px' }}>
        <Tabs
          variant="scrollable"
          scrollButtons="auto"
          value={value}
          onChange={handleChange}
          aria-label="search results tabs"
        >
          <Tab label="Primary" {...a11yProps(0)} />
          <Tab label="Images" {...a11yProps(1)} />
          <Tab label="Videos" {...a11yProps(2)} />
          <Tab label="Documents" {...a11yProps(3)} />
        </Tabs>
        <CustomTabPanel value={value} index={0}>
          {renderPrimary()}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          {renderResources(1)}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          {renderResources(2)}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          {renderResources(3)}
        </CustomTabPanel>
      </Paper>
    </Layout>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      data: {
        constants: {
          R2_DOMAIN: process.env.R2_DOMAIN,
        },
      },
    },
  };
}
