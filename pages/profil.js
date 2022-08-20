import React, { useState, useEffect } from 'react';
import Account from '../components/Account';
import { supabase } from '../utils/supabase';
import { Footer } from '../components/Footer';
import { useRouter } from 'next/router';
import { Helmet } from 'react-helmet';
import { NotConnected } from '../components/NotConnected';

export default function Profil() {
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
        <title>Care - Votre Profil</title>
      </Helmet>
      <Account key={session.user.id} session={session} />
    </div>
  ) : (
    <NotConnected />
  );
}
