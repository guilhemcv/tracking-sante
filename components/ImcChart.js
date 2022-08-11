import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const data = {
  labels: [
    'Maigreur',
    'Normal',
    'Surpoids',
    'Obésité modérée',
    'Obésité extrême',
    'Votre IMC',
  ],
  datasets: [
    {
      label: '# of Votes',
      data: [18.5, 25, 30, 40, 50, 24.8],
      backgroundColor: [
        'rgba(2, 179, 236, 1.0)',
        'rgba(121, 185, 42, 1.0)',
        'rgba(243, 160, 0, 1.0)',
        'rgba(238, 113, 3, 1.0)',
        'rgba(230, 3, 21, 1.0)',
        'rgba(255, 159, 64, 0.5)',
      ],
      borderWidth: 1,
    },
  ],
};

export default function ImcChart() {
  return (
    <div className='w-6/12 mx-auto mt-24'>
      <PolarArea data={data} />
    </div>
  );
}
