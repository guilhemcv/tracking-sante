import { Footer } from '../components/Footer';
import NavAccueil from '../components/NavBar';
import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import WaterTrack from '../components/WaterTrack';
import { infoEau } from '../data/InfoEau';
import idea from '../public/assets/images/idea.png';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import add from '../public/assets/images/add.png';
import moins from '../public/assets/images/moins.png';

export default function SuiviEau({ session }) {
  const [loading, setLoading] = useState(true);
  const [water, setWater] = useState([]);
  const [todayGlasses, setTodayGlasses] = useState(0);
  const [weight, setWeight] = useState([]);
  const [waterToDrink, setWaterToDrink] = useState(null);
  const [random, setRandom] = useState();
  const [added, setAdded] = useState(false);
  const [waterSelected, setWaterSelected] = useState(false);
  const [nbVerres, setNbVerres] = useState(0);

  useEffect(() => {
    if (weight.length > 0) {
      const lastWeight = parseInt(weight[weight.length - 1].poids);
      setWaterToDrink((lastWeight - 20) * 15 + 1500);
    }
    setRandom(infoEau[Math.floor(Math.random() * infoEau.length)].info);
  }, [weight]);

  useEffect(() => {
    getProfile();
  }, [session]);

  const addWater = () => {
    const today = new Date().toLocaleDateString();
    if (water.find((data) => data.date === today)) {
      water.map((data) => {
        data.values.push(nbVerres);
      });
    } else {
      setWater([...water, { date: today, values: [nbVerres] }]);

      //create a new item with the date and the nbVerres
    }
    setAdded(true);
  };

  console.log(water);

  async function getProfile() {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`water, weight`)
        .eq('id', user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setWater(data.water);
        setWeight(data.weight);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ water }) {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      const updates = {
        id: user.id,
        water,
      };

      let { error } = await supabase.from('profiles').upsert(updates, {
        returning: 'minimal', // Don't return the value after inserting
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      toast.success('💧 Vos consommations ont été rajoutées !', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoading(false);
      setWaterSelected(false);
      setNbVerres(0);
    }
  }

  return (
    <>
      <NavAccueil />
      <ToastContainer />
      <div className="flex md:flex-row flex-col items-center justify-center my-10 bg-slate-100 rounded shadow-lg p-4 w-11/12 md:w-9/12 mx-auto">
        <Image src={idea} alt="idea" width={50} height={50} />
        <h1 className="md:ml-20 text-center md:text-left">
          <span className="md:text-xl font-bold">Le saviez-vous ? </span>
          <br />
          {random}
        </h1>
      </div>
      <h2 className="w-11/12 mx-auto text-center my-10 md:text-xl font-bold">
        Selon votre morphologie et votre age, vous devez boire{' '}
        <span className="text-blue-500"> {waterToDrink} ml </span> d&apos;eau
        par jour, soit environ {Math.ceil(waterToDrink / 200)} verres de 20 cl.
      </h2>
      <WaterTrack water={water} waterToDrink={waterToDrink} />
      <p className="text-center text-xl my-20">
        Ici, vous pouvez ajouter votre consommation d&apos;eau au fur et à
        mesure de la journée.
      </p>
      {!waterSelected ? (
        <div className="flex  items-center justify-center w-11/12 md:justify-around mx-auto md:w-96 mt-10 mb-40">
          <button type="button" onClick={() => setWaterSelected(true)}>
            <Image src={add} alt="logo ajout" width={40} height={40} />
          </button>
          <h3 className="md:text-xl font-bold ml-5 md:ml-0">
            Ajouter une consommation d&apos;eau
          </h3>
        </div>
      ) : (
        <div className="mt-20 mb-40 mx-auto md:w-11/12">
          {!added && (
            <>
              <div className="flex w-9/12 md:w-6/12 justify-between md:justify-between mx-auto">
                <p className="mr-10 w-22 font-bold">Date du jour :</p>
                <p>{new Date().toLocaleDateString()}</p>
              </div>
              <div className="flex flex-col w-9/12 md:w-6/12 justify-between md:justify-between mx-auto mt-5 mb-10 md:mb-0">
                <p className="text-center font-bold">
                  Choisir le nombre de verres consommés (20cl) :
                </p>
                <div className="flex items-center justify-around w-28 mx-auto mt-10">
                  <button onClick={() => setNbVerres(nbVerres + 1)}>
                    <Image src={add} alt="logo ajout" width={20} height={20} />
                  </button>
                  <p className="pb-2">{nbVerres}</p>
                  <button
                    onClick={() => {
                      if (nbVerres < 0) {
                        setNbVerres(0);
                      } else {
                        setNbVerres(nbVerres - 1);
                      }
                    }}
                  >
                    <Image
                      src={moins}
                      alt="logo moins"
                      width={20}
                      height={20}
                    />
                  </button>
                </div>
              </div>
            </>
          )}
          <div className="flex flex-col items-center justify-center">
            {!added ? (
              <>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5 mb-5 "
                  type="button"
                  onClick={() => {
                    addWater();
                  }}
                >
                  ajouter
                </button>
              </>
            ) : (
              <h2 className="text-xl text-center font-bold mb-5">
                Donnée ajoutée, valider pour sauvegarder.
              </h2>
            )}
            {added && (
              <>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5 mb-5"
                  type="button"
                  onClick={() => {
                    updateProfile({ water });
                    setAdded(false);
                  }}
                >
                  valider
                </button>
              </>
            )}
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
