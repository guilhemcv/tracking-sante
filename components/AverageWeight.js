import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

export const AverageWeight = () => {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const data = {
    labels: ['Moyenne Homme', 'Moyenne Femme'],
    title: {
        display: true,
        text: 'Moyenne du poids',
    },
    datasets: [
      {
        data: [81.2, 63],
        backgroundColor: ['rgba(54, 162, 235)','rgba(255, 99, 132)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="">
      <Pie data={data} />
    </div>
  );
};
