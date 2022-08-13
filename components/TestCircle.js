import { useEffect, useState } from 'react';

const TestCircle = ({ height, weight }) => {
  const [imc, setImc] = useState(0);
  const [typeImc, setTypeImc] = useState('');
  const [classe, setClasse] = useState('');

  useEffect(() => {
    if (imc === 0) {
      setClasse('circle');
    }
    if (imc < 18.5) {
      setClasse('circle underweight');
      setTypeImc('maigreur');
    }
    if (imc >= 18.5 && imc < 25) {
      setClasse('circle normal');
      setTypeImc('normal');
    }
    if (imc >= 25 && imc < 30) {
      setClasse('circle overweight');
      setTypeImc('surpoids');
    }
    if (imc >= 30) {
      setClasse('circle obese');
      setTypeImc('obésité');
    }
  }, [imc]);

  useEffect(() => {
    setImc((weight.poids / ((height * height) / 10000)).toFixed(2));
  }, [weight, height]);

  return (
    <div className='lg:mb-0'>
      <div className={classe}>
        <p className="text">
          IMC <br /> {imc} <br /> {typeImc}
        </p>
      </div>
    </div>
  );
};

export default TestCircle;