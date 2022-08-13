import { Footer } from '../components/Footer';
import NavAccueil from '../components/NavBar';
import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import WeightTrack from '../components/WeightTrack';
import { AverageWeight } from '../components/AverageWeight';
import { infoPoids } from '../data/InfoPoids';
import idea from '../public/assets/images/idea.png';
import Image from 'next/image';
import add from '../public/assets/images/add.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SuiviPoids({ session }) {
  const [loading, setLoading] = useState(true);
  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const [weight, setWeight] = useState([]);
  const [weightSelected, setWeightSelected] = useState(false);
  const [newWeight, setNewWeight] = useState(false);
  const [dateToSave, setDateToSave] = useState(new Date().toLocaleDateString());
  const [added, setAdded] = useState(false);

  const [random, setRandom] = useState();

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`weight`)
        .eq('id', user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setWeight(data.weight);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // find today's date in the weight array
    const today = new Date().toLocaleDateString();
    if (weight !== null && weight.find((item) => item.date === today)) {
      setAlreadyAdded(true);
    }
    setRandom(infoPoids[Math.floor(Math.random() * infoPoids.length)].info);
  }, [weight]);

  console.log(alreadyAdded);

  const addWeight = () => {
    setWeight([
      ...weight,
      { date: dateToSave.split('-').reverse().join('/'), poids: newWeight },
    ]);
    setAdded(true);
  };

  async function updateProfile({ weight }) {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      const updates = {
        id: user.id,
        weight,
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
      toast.success('👍 Super, données sauvegardées !', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setAdded(false);
      setLoading(false);
      setWeightSelected(false);
    }
  }

  return (
    <div className="">
      <NavAccueil />
      <ToastContainer />
      <div className="flex md:flex-row flex-col items-center justify-center my-10 bg-slate-100 rounded shadow-lg p-4 w-11/12 md:w-9/12 mx-auto">
        <Image src={idea} alt="idea" width={50} height={50} />
        <h1 className="md:ml-20 text-center md:text-left">
          <span className="text-xl font-bold">Le saviez-vous ? </span>
          <br />
          {random}
        </h1>
      </div>
      <div className="lg:flex lg:flex-row items-center justify-around mt-10">
        <WeightTrack weight={weight} />
        <div className="flex flex-col items-center my-10 lg:mt-0">
          <h2 className="mb-5 text-xl font-bold underline">
            Moyenne française
          </h2>
          <AverageWeight />
        </div>
      </div>
      <p className="text-center text-xl mt-20">
        Ici, vous pouvez ajouter votre poids une fois par jour et suivre la
        courbe d&apos;évolution.
      </p>
      {!alreadyAdded ? (
        !weightSelected ? (
          <div className="flex  items-center justify-center w-11/12 md:justify-around mx-auto md:w-96 mt-10 mb-40">
            <button type="button" onClick={() => setWeightSelected(true)}>
              <Image src={add} alt="logo ajout" width={40} height={40} />
            </button>
            <h3 className="md:text-xl font-bold ml-5 md:ml-0">Ajouter votre poids du jour</h3>
          </div>
        ) : (
          <div className="mt-20 mb-40 mx-auto md:w-11/12">
            <div className="flex w-9/12 md:w-6/12 justify-between md:justify-between mx-auto">
              <p className="mr-10 w-22 font-bold">Date du jour :</p>
              <p>{new Date().toLocaleDateString()}</p>
            </div>
            <div className="flex w-9/12 md:w-6/12 justify-between md:justify-between mx-auto mt-5 mb-10 md:mb-0">
              <p className="mr-10 w-22">Saisir le poids :</p>
              <input
                className="w-28 text-center bg-white shadow-md"
                type="number"
                min="30"
                max="400"
                step="0.1"
                placeholder="75,2"
                onChange={(e) => setNewWeight(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              {!added ? (
                <>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5 mb-5 "
                    type="button"
                    onClick={() => {
                      addWeight();
                    }}
                  >
                    ajouter
                  </button>
                </>
              ) : (
                <h2 className="text-xl text-center font-bold md:mt-20">
                  Donnée ajoutée, valider pour sauvegarder.
                </h2>
              )}
              {added && (
                <>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5 mb-5"
                    type="button"
                    onClick={() => {
                      updateProfile({ weight });
                      setAdded(false);
                    }}
                  >
                    valider
                  </button>
                  <ToastContainer />
                </>
              )}
            </div>
          </div>
        )
      ) : (
        <div className="flex items-center justify-center mt-20 mb-40 text-center">
          <h2 className="md:text-xl font-bold">
            Vous avez déjà ajouté votre poids du jour. <br /> revenez demain ! 📅
          </h2>
        </div>  
      )}

      <Footer />
    </div>
  );
}
