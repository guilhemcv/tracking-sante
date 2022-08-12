import { Footer } from '../components/Footer';
import NavAccueil from '../components/NavBar';
import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import WeightTrack from '../components/WeightTrack';
import { AverageWeight } from '../components/AverageWeight';
import WaterWave from '../components/WaterWave';
import { infoPoids } from '../data/InfoPoids';
import idea from '../public/assets/images/idea.png';
import Image from 'next/image';

export default function SuiviPoids({ session }) {
  const [loading, setLoading] = useState(true);
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState([]);
  const [dateToSave, setDateToSave] = useState(null);
  const [newWeight, setNewWeight] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [weightSelected, setWeightSelected] = useState(false);

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

  const randomQuote = infoPoids[Math.floor(Math.random()*infoPoids.length)].info;

  console.log(randomQuote)

  return (
    <>
      <NavAccueil />
      <div className='flex items-center justify-center my-10 bg-slate-100 rounded shadow-lg py-4 w-7/12 mx-auto'>
    <Image src={idea} alt="idea" width={50} height={50}/>
        <h1 className='ml-20'><span className='text-xl font-bold'>Le saviez-vous ? </span><br/>{randomQuote}</h1>
      </div>
      <div className="flex items-center justify-around mt-10">
        <WeightTrack weight={weight} />
        <div className="flex flex-col items-center">
          <h2 className="mb-5 text-xl font-bold underline">Moyenne française</h2>
          <AverageWeight />
        </div>
      </div>
      <Footer />
    </>
  );
}
