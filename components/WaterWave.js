import { ProgressBar } from 'react-progressbar-fancy';
import React, { useState, useEffect } from 'react';

const WaterWave = ({ water, waterToDrink }) => {
  const [todayVerres, setTodayVerres] = useState(null);
  const todayDate = new Date().toLocaleDateString();

  useEffect(() => {
    const todayWater = [];
    water.forEach((water) => {
      if (water.date === todayDate) {
      //addition the total in values array in water object
      todayWater.push(water.values.reduce((total, current) => total + current, 0));
        const purcentage = ((todayWater[0] * 20) * 1000) / waterToDrink;
        setTodayVerres(purcentage.toFixed(2)); 
      }
    });
  }, [water]);
  
  console.log(todayVerres);

  return (
    <>
      <ProgressBar progressColor="blue" hideText score={todayVerres <= 100 ? todayVerres : "100"} />
      <h2 className="text-2xl font-bold text-gray-800 text-center">{todayVerres} %</h2>
    </>
  );
};

export default WaterWave;
