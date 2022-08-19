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
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

const WaterTrack = ({ night }) => {
  useEffect(() => {}, [night]);

  const [labels, setLabels] = useState([]);
  const [donnees, setDonnees] = useState([]);

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
        text: 'Votre consommation deau',
      },
    },
  };

  useEffect(() => {
    setLabels(night !== null && night.map((data) => data.date).slice(-10));
    setDonnees(
      night !== null &&
        night
          .map((data) => {
            let arr = data.nuit.split(':');
            let dec = parseInt((arr[1] / 6) * 10, 10);
            return parseFloat(
              parseInt(arr[0], 10) + '.' + (dec < 10 ? '0' : '') + dec
            );
          })
          .slice(-10)
    );
  }, [night]);

  const data = {
    labels,
    datasets: [
      {
        label: "Temps de sommeil en heures",
        data: donnees,
        fill: true,
        borderColor: 'rgba(254, 214, 0, 1)',
        backgroundColor: 'rgba(254, 214, 0, 1)',
        tension: 0.5,
      },
    ],
  };

  return (
    <div className="w-11/12 mx-auto">
      <Line options={options} data={data} />
    </div>
  );
};

export default WaterTrack;
