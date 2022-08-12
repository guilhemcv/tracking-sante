import { ProgressBar } from 'react-progressbar-fancy';
import React, { useState, useEffect } from 'react';

const WaterWave = ({ water, waterToDrink }) => {
  const [todayVerres, setTodayVerres] = useState(null);
  const todayDate = new Date().toLocaleDateString();

  useEffect(() => {
    const todayWater = [];
    water.forEach((water) => {
      if (water.date === todayDate) {
        todayWater.push(water.values);
        const totalVerres =
          todayWater[0].reduce((acc, obj) => acc + obj.verre, 0) * 20;
        console.log(totalVerres);
        const purcentage = (totalVerres * 1000) / waterToDrink;
        setTodayVerres(purcentage.toFixed(2));
      }
    });
  }, [water]);

  return (
    <>
      <ProgressBar progressColor="blue" hideText score={todayVerres} />
      <h2 className="text-2xl font-bold text-gray-800 text-center">{todayVerres} %</h2>
    </>
  );
};

export default WaterWave;
