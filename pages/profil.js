import React, { useState, useEffect } from 'react';
import Account from '../components/Account';
import { supabase } from '../utils/supabase';
import { Footer } from '../components/Footer';
import { useRouter } from 'next/router';

export default function Profil() {
  const [session, setSession] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);  
    });
  }, []);

  console.log(session);

  return session ? (
    <div>
      <Account key={session.user.id} session={session} />
    </div>
  ) : (
    <div>
      <h1>Vous n&apos;êtes pas connecté</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5 mb-5"
        onClick={() => router.push('/')}
      >
        Retour
      </button>
      <Footer />
    </div>
  );
}
