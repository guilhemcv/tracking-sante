import React, { useState } from 'react';
import { supabase } from '../utils/supabase';
import 'react-toastify/dist/ReactToastify.css';

export const Landing = ({displayToast}) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [send, setSend] = useState(false);

  const handleLogin = async (email) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email });
      if (error) throw error;
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div className="bg-black w-6/12 rounded opacity-80 text-center p-10 mt-28 ml-10">
      <h1 className="text-4xl text-white  mb-10">
        Bienvenue sur l&apos;application <br /> qui prend soin de votre santé !
      </h1>
      <h2 className="text-2xl text-white">
        Suivi de votre poids, de votre consommation d&apos;eau, <br /> analyses
        et bien plus encore !
      </h2>
      <div className="col-6 form-widget">
        {!send ? (
          <>
            <p className="text-white my-10">
              Se connecter via magic link avec votre email ci-dessous :
            </p>
            <div>
              <input
                type="email"
                placeholder="Votre email"
                className="p-2 text-center"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleLogin(email);
                  displayToast();
                  setSend(true);
                }}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5 mb-5"
                disabled={loading}
              >
                <span>{loading ? 'Loading' : 'Recevoir un lien'}</span>
              </button>
            </div>
          </>
        ) : (
          <div>
            <p className="text-white my-10">Consulter votre boite mail !</p>
          </div>
        )}
      </div>
    </div>
  );
};
