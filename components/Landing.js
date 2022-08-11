import React, { useState } from 'react';
import { supabase } from '../utils/supabase';

export const Landing = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleLogin = async (email) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email });
      if (error) throw error;
      alert('Check your email for the login link!');
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
            }}
            className="button block"
            disabled={loading}
          >
            <span>{loading ? 'Loading' : 'Send magic link'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
