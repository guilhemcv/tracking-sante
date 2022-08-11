import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavAccueil from './NavBar';
import { Footer } from './Footer';

export default function Account({ session }) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [height, setHeight] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, lastname, height, avatar_url`)
        .eq('id', user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setLastname(data.lastname);
        setHeight(data.height);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ username, lastName, height, avatar_url }) {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      const updates = {
        id: user.id,
        username,
        lastname,
        avatar_url,
        height,
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
      <NavAccueil />
      <div className="flex flex-col w-9/12 mx-auto">
        <div className="flex flex-col">
          <label className="text-2xl my-4" htmlFor="email">
            Email
          </label>
          <input
            className="w-9/12 bg-gray-200 h-8 rounded"
            id="email"
            type="text"
            value={session.user.email}
            disabled
          />
        </div>
        <div className="flex flex-col">
          <label className="text-2xl my-4" htmlFor="username">
            Nom
          </label>
          <input
            className="w-9/12 bg-gray-200 h-8 rounded"
            id="username"
            type="text"
            value={username || ''}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-2xl my-4" htmlFor="lastname">
            Prénom
          </label>
          <input
            className="w-9/12 bg-gray-200 h-8 rounded"
            id="lastname"
            type="text"
            value={lastname || ''}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-2xl my-4" htmlFor="height">
            Votre taille
          </label>
          <input
            className="w-9/12 bg-gray-200 h-8 rounded"
            id="height"
            type="height"
            value={height || ''}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
        <div className="flex justify-around w-9/12">
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5 mb-5"
              onClick={() =>
                updateProfile({ username, height, lastname, avatar_url })
              }
              disabled={loading}
            >
              {loading ? 'Loading ...' : 'Update'}
            </button>
            <ToastContainer />
          </div>

          <div>
            <button
              className="bg-orange-500 hover:bg-orange-700 font-bold py-2 px-4 rounded mt-5 mb-5"
              onClick={() => supabase.auth.signOut()}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
