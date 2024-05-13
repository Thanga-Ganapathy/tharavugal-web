import { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import BarChart from './charts/Bar';
import AreaChart from './charts/Area';
import LineChart from './charts/Line';
import PieChart from './charts/Pie';
import DoughnutChart from './charts/DoughnutChart';
import { setAppState, useAppState } from '@/store';
import HorizontalBar from './charts/HorizontalBar';

export default function Charts() {
  const { chartType, title, data, isLoading } = useAppState((s) => ({
    chartType: s.visualizer.chartType,
    title: s.visualizer.title,
    data: s.visualizer.data,
    isLoading: s.visualizer.loading,
  }));

  if (isLoading) {
    return (
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (data.length === 0) {
    return (
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Alert severity="info">No data</Alert>
      </Box>
    );
  }

  const renderChart = () => {
    switch (chartType) {
      case 'Area Chart':
        return <AreaChart title={title} data={data} />;
      case 'Bar Chart':
        return <BarChart title={title} data={data} />;
      case 'HorizontalBar Chart':
        return <HorizontalBar title={title} data={data} />;
      case 'Line Chart':
        return <LineChart title={title} data={data} />;
      case 'Pie Chart':
        return <PieChart title={title} data={data} />;
      case 'Doughnut Chart':
        return <DoughnutChart title={title} data={data} />;
      default:
        break;
    }
  };

  return (
    <Box p={2}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="chart-type-label">Chart Type</InputLabel>
          <Select
            labelId="chart-type-label"
            value={chartType}
            label="Chart Type"
            onChange={(e) =>
              setAppState((s) => ({
                visualizer: { ...s.visualizer, chartType: e.target.value },
              }))
            }
          >
            <MenuItem value="Area Chart">Area Chart</MenuItem>
            <MenuItem value="Bar Chart">Bar Chart</MenuItem>
            <MenuItem value="HorizontalBar Chart">H-Bar Chart</MenuItem>
            <MenuItem value="Doughnut Chart">Doughnut Chart</MenuItem>
            <MenuItem value="Line Chart">Line Chart</MenuItem>
            <MenuItem value="Pie Chart">Pie Chart</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box>{renderChart()}</Box>
    </Box>
  );
}
