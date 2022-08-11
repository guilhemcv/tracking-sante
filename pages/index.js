import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../utils/supabase';
import NavAccueil from '../components/NavBar';
import { Footer } from '../components/Footer';
import { Landing } from '../components/Landing';
import NavLanding from '../components/NavBarAccueil';

export default function Home() {
  const [session, setSession] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  if (session) {
    router.push('/dashboard');
  }
  return (
    <div className="h-screen bg-center bg-[url('../public/assets/images/running-woman.jpg')]">
      <NavLanding />
      <Landing />
      <Footer />
    </div>
  );
}

{
  /* <Account key={session.user.id} session={session} /> */
}
