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

const WaterTrack = ({water, waterToDrink}) => {
  console.log(water);
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
        text: "Votre consommation deau",
      },
    },
  };

  useEffect(() => {  
    setLabels(water.map((data) => data.date))
    const donnees = water.map((data) => {
      data.values;
      const average = data.values.reduce((acc, obj) => acc + obj.verre, 0) * 200;
      return average;
      /* const purcentage = (average * 1000) / waterToDrink;
      return purcentage.toFixed(2); */
    })
    setDonnees(donnees);
  }, [water]);

 

  const data = {
    labels,
    datasets: [
      {
        label: "Consommation d'eau journalière en ml",
        data: donnees,
        fill: true,
        borderColor: 'rgba(0, 167, 255)',
        backgroundColor: 'rgba(0, 167, 255)',
        tension: 0.5,
      },
    ],
  }; 

  return (
    <div className='w-11/12 mx-auto lg:w-2/3'>
       <Line options={options} data={data} />
     </div>
  );
};

export default WaterTrack;
