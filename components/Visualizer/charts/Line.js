import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Colors,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Colors
);

export default function LineChart({ title, data }) {
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
        // borderColor: 'rgb(53, 162, 235)',
        // backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return <Line options={options} data={chartData} />;
}
