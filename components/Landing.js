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
    <div className="bg-black w-11/12 lg:w-8/12 md:w-9/12 mx-auto mt-4 rounded opacity-80 text-center md:p-2  md:mt-20 md:ml-10 ">
      <h1 className="md:text-4xl font-bold text-lg w-11/12 mx-auto mt-20 md:mt-0 text-white  py-10 md:py-2">
        Bienvenue sur l&apos;application <br /> qui prend soin de votre santé !
      </h1>
      <h2 className="text-lg w-11/12 mx-auto text-white">
        Suivi de votre poids, de votre consommation d&apos;eau, <br /> analyses
        et bien plus encore !
      </h2>
      <div className="col-6 form-widget">
        {!send ? (
          <>
            <p className="text-white my-5 text-sm w-11/12 mx-auto md:my-10">
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
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5 mb-10"
                disabled={loading}
              >
                <span>{loading ? 'Loading' : 'Recevoir un lien'}</span>
              </button>
            </div>
          </>
        ) : (
          <div>
            <p className="text-white mt-10 pb-20 w-11/12 mx-auto">Consulter votre boite mail ! <br/> (Le message peut arriver dans les spams, pensez à les vérifier !)</p>
          </div>
        )}
      </div>
    </div>
  );
};
