import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavAccueil from './NavBar';
import { Footer } from './Footer';

export default function Account({ session }) {
  const [loading, setLoading] = useState(true);
  const [lastname, setLastname] = useState(null);
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [poids, setPoids] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [water, setWater] = useState(null);

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
        .select(`username, lastname, height, weight`)
        .eq('id', user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setLastname(data.lastname);
        setHeight(data.height);
        setWeight(data.weight);
        setWater(data.water);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ lastname, height, weight, water }) {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      const updates = {
        id: user.id,
        lastname,
        weight: [{ date: new Date().toLocaleDateString(), poids }],
        height,
        water: [{ date: new Date().toLocaleDateString(), values: [0] }],
        updated_at: new Date(),
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
    }
  }

  return (
    <>
      <NavAccueil water={water} weight={weight} lastname={lastname} />
      <div className="flex flex-col w-11/12 mx-auto my-5">
        <div className="flex flex-col w-full">
          <label
            className="block font-bold   text-gray-700 mb-2 "
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-l border-gray-300 rounded-md"
            id="email"
            type="text"
            value={session.user.email}
            disabled
          />
        </div>
        <div className="flex w-full flex-col my-5">
          <label
            className="block  font-bold  text-gray-700 mb-2"
            htmlFor="lastname"
          >
            Prénom ou pseudo :
          </label>
          <input
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-l border-gray-300 rounded-md"
            id="lastname"
            type="text"
            value={lastname || ''}
            required="required"
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>

        <div className="flex w-full flex-col my-5">
          <label
            className="block  font-bold  text-gray-700 mb-2"
            htmlFor="weight"
          >
            Votre Poids (en kg) :
          </label>
          <input
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-l border-gray-300 rounded-md"
            id="weight"
            type="weight"
            required="required"
            defaultValue={
              Array.isArray(weight) ? weight[weight.length - 1].poids : ''
            }
            disabled={Array.isArray(weight)}
            onChange={(e) => setPoids(e.target.value)}
          />
        </div>

        <div className="flex w-full flex-col my-5">
          <label
            className="block font-bold  text-gray-700 mb-2"
            htmlFor="height"
          >
            Votre taille (en cm) :
          </label>
          <input
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-l border-gray-300 rounded-md"
            id="height"
            type="height"
            value={height || ''}
            required="required"
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
        <div className="flex w-full justify-around">
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5 mb-5"
              onClick={() => updateProfile({ height, lastname, weight })}
              disabled={loading}
            >
              {loading ? 'Loading ...' : 'Mettre à jour'}
            </button>
            <ToastContainer />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
