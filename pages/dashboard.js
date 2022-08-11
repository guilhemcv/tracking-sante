import { Footer } from '../components/Footer';
import NavAccueil from '../components/NavBar';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../utils/supabase';

export default function Dashboard() {
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
      <NavAccueil />
      <h1>Dashboard</h1>
      <Footer />
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
