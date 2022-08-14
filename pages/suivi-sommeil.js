import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { Footer } from '../components/Footer';
import NavAccueil from '../components/NavBar';
import { Helmet } from 'react-helmet';
import { NotConnected } from '../components/NotConnected';

export default function SuiviSommeil() {
    const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  return session ? (
    <div>
      <Helmet>
        <title>Care - Suivi sommeil</title>
      </Helmet>
      <NavAccueil />
      <h1>sommeil</h1>
      <Footer />
    </div>
  ) : (
    <NotConnected />
  );
}
