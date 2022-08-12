import { Footer } from '../components/Footer';
import NavAccueil from '../components/NavBar';
import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import WaterTrack from '../components/WaterTrack';
import { infoEau } from '../data/InfoEau';
import idea from '../public/assets/images/idea.png';
import Image from 'next/image';

export default function SuiviEau({ session }) {
  const [loading, setLoading] = useState(true);
  const [water, setWater] = useState([]);
  const [weight, setWeight] = useState([]);
  const [waterToDrink, setWaterToDrink] = useState(null);
  const [random, setRandom] = useState(
    infoEau[Math.floor(Math.random() * infoEau.length)].info
  );

  useEffect(() => {
    if (weight.length > 0) {
      const lastWeight = parseInt(weight[weight.length - 1].poids);
      setWaterToDrink((lastWeight - 20) * 15 + 1500);
    }
  }, [weight]);


  useEffect(() => {
    getProfile();
  }, [session]);

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

  /* async function updateProfile({ weight }) {
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
  } */

  return (
    <>
      <NavAccueil />
      <div className="flex items-center justify-center px-5 my-10 bg-slate-100 rounded shadow-lg py-4 w-11/12 lg:w-8/12 mx-auto">
        <Image src={idea} alt="idea" width={50} height={50} />
        <h1 className="ml-4 md:ml-20">
          <span className="md:text-xl font-bold">Le saviez-vous ? </span>
          <br />
          {random}
        </h1>
      </div>
      <h2 className='w-11/12 mx-auto text-center my-10 md:text-xl font-bold'>Selon votre morphologie et votre age, vous devez boire <span className='text-blue-500'> {waterToDrink} ml </span> d&apos;eau par jour, soit environ {Math.ceil(waterToDrink / 200)} verres de 20 cl.</h2>
      <WaterTrack water={water} waterToDrink={waterToDrink} />
      <Footer />
    </>
  );
}
