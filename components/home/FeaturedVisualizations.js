import { Box, Card, CardContent, Divider, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import useAlert from '@/hooks/useAlert';
import { format } from 'date-fns-tz';
import { endOfMonth, startOfMonth } from 'date-fns';
import { FcDoughnutChart } from 'react-icons/fc';
import Elephant from '../icons/Elephant';
import Ambulance from '../icons/Ambulance';
import Fire from '../icons/Fire';
import Warning from '../icons/Warning';

function FeaturedBox({ data }) {
  const router = useRouter();
  const showAlert = useAlert();
  const queryStr = btoa(JSON.stringify(data.filters));

  return (
    <Box
      mt={2}
      onClick={() => {
        if (data.disabled) {
          showAlert('default', 'Currently, no data available');
          return;
        }
        router.push('/visualizer?q=' + queryStr);
      }}
    >
      <Card
        variant="outlined"
        sx={{
          userSelect: 'none',
          cursor: 'pointer',
          borderColor: (t) => t.palette.primary.light,
          '&:hover': {
            background: '#01ff709e',
            borderColor: '#01ff709e',
          },
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box>
            {data.icon && (
              <Box
                component={data.icon}
                sx={{ width: '50px', height: '50px', mr: 3 }}
              />
            )}
          </Box>
          <Box>
            <Typography variant="h5" textAlign="center">
              {data.title}
            </Typography>

            <Typography
              variant="subtitle2"
              sx={{ textAlign: 'center', color: 'text.secondary' }}
            >
              {data.subtitle}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default function FeaturedVisualizations() {
  const currentMonth = format(new Date(), 'MM', {
    timeZone: Intl.DateTimeFormat().resolvedOptions(),
  });
  const currentYear = format(new Date(), 'yyyy', {
    timeZone: Intl.DateTimeFormat().resolvedOptions(),
  });
  const list = [
    {
      title: 'Elephant Deaths',
      icon: Elephant,
      subtitle: `(${format(new Date(), 'yyyy')})`,
      filters: {
        category: 'Elephant Death',
        from: new Date(`${currentYear}-01-01`),
        to: new Date(),
        locations: [],
        view: 'Date',
        chartType: 'Bar Chart',
      },
    },
    {
      title: 'Fire Accidents',
      icon: Fire,
      subtitle: `(${format(new Date(), 'yyyy')} - Months View)`,
      filters: {
        category: 'Fire Accident',
        from: new Date(`01-01-${currentYear}`),
        to: new Date(),
        locations: [],
        view: 'Month',
        chartType: 'Area Chart',
      },
    },
    {
      title: 'Road Accidents',
      icon: Ambulance,
      subtitle: `(${format(new Date(), 'MMMM')} - Week Day View)`,
      filters: {
        category: 'Road Accident',
        from: startOfMonth(new Date()),
        to: endOfMonth(new Date()),
        locations: [],
        view: 'Week',
        chartType: 'Doughnut Chart',
      },
    },
    {
      title: 'Natural Disasters',
      icon: Warning,
      subtitle: `(Year view)`,
      filters: {
        category: 'Natural Disaster',
        from: '',
        to: '',
        locations: [],
        view: 'Year',
        chartType: 'Bar Chart',
      },
    },
    {
      title: '🧒 Children Sexual Abuses',
      filters: {},
      disabled: true,
    },
  ];

  return (
    <Box p={1}>
      <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
        <FcDoughnutChart style={{ fontSize: '35px', marginRight: '10px' }} />{' '}
        Visualizations (Featured)
      </Typography>
      <Divider sx={{ borderColor: 'darkgray' }} />
      <Box p={2}>
        {list.map((l, i) => (
          <FeaturedBox key={i} data={l} />
        ))}
      </Box>
    </Box>
  );
}
