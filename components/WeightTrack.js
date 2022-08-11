import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

const WeightTrack = ({weight}) => {


    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Filler,
        Legend
      );
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: 'Suivi du poids',
      },
    },
  };

   const labels = weight.map(({date}) => date).slice(-10);
   const donnees = weight.map(({poids}) => poids).slice(-10);

  const data = {
    labels,
    datasets: [
      {
        label: 'Évolution du poids',
        data: donnees,
        fill: true,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192)',
        tension: 0.5,
      },
    ],
  };

  return (
    <div className='lg:w-1/2 w-9/12'>
      <Line options={options} data={data} />
    </div>
  );
};

export default WeightTrack;
