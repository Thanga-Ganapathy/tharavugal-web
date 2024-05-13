import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Colors,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Colors
);

export default function BarChart({ title, data }) {
  const options = {
    responsive: true,
    plugins: {
      legend: false,
      title: {
        display: true,
        text: title,
      },
      colors: {
        forceOverride: true
      }
    },
  };

  const chartData = {
    labels: data.map((i) => i.label),
    datasets: [
      {
        label: title,
        data: data.map((i) => i.total),
        // backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return <Bar options={options} data={chartData} />;
}
