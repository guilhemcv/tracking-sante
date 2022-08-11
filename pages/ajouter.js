import React from 'react';
import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { Footer } from '../components/Footer';
import NavAccueil from '../components/NavBar';
import add from '../public/assets/images/add.png';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Ajouter({ session }) {
  const [loading, setLoading] = useState(true);
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState([]);
  const [dateToSave, setDateToSave] = useState(null);
  const [newWeight, setNewWeight] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [weightSelected, setWeightSelected] = useState(false);

  //when the button is clicked, the date and the weight are added to the weight array
  function addWeight() {
    setWeight([
      ...weight,
      { date: dateToSave.split('-').reverse().join('/'), poids: newWeight },
    ]);
  }
  console.log(weight);

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
      toast.success('Profil mis à jour !', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoading(false);
      setWeightSelected(false);
    }
  }

  return (
    <div>
      <NavAccueil />
      {!weightSelected ? (
        <div className="flex w-4/12 justify-between mx-auto mt-10">
          <h2>Je veux ajouter une donnée &quot;poids&quot;</h2>
          <button type="button" onClick={() => setWeightSelected(true)}>
            <Image src={add} alt="logo ajout" width={30} height={30} />
          </button>
        </div>
      ) : (
        <div className="mt-20">
          <div className="flex w-6/12 justify-between mx-auto">
            <p>Choisir une date</p>
            <input
              type="date"
              onChange={(e) => setDateToSave(e.target.value)}
            />
          </div>
          <div className="flex w-6/12 justify-between mx-auto mt-5">
            <p>Saisir le poids</p>
            <input
              className="w-40 text-center bg-white shadow-md"
              type="number"
              min="30"
              max="400"
              step="0.1"
              placeholder="75,2"
              onChange={(e) => setNewWeight(e.target.value)}
            />
          </div>
          <div className="flex justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5 mb-5 "
              type="button"
              onClick={() => addWeight()}
            >
              ajouter
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5 mb-5"
              type="button"
              onClick={() => {
                updateProfile({ weight });
                
              }}
            >
              valider
            </button>
          </div>
          <ToastContainer />
        </div>
      )}
      <div className="flex w-4/12 justify-between mx-auto mt-10">
        <h2>Je veux ajouter une donnée &quot;eau&quot;</h2>
        <button type="button" onClick={() => setSelected(true)}>
          <Image src={add} alt="logo ajout" width={30} height={30} />
        </button>{' '}
      </div>
      <Footer />
    </div>
  );
}
