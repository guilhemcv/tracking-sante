import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../utils/supabase';
import NavAccueil from '../components/NavBar';
import { Footer } from '../components/Footer';
import { Landing } from '../components/Landing';
import NavLanding from '../components/NavBarAccueil';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet';

export default function Home() {
  const [session, setSession] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const displayToast = () => {
    toast.success('📬 Le lien a été envoyé ! consultez votre boite mail.', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  if (session) {
    router.push('/dashboard');
  }
  return (
    <div className="h-screen bg-center bg-[url('/assets/images/running-woman.jpg')]">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Bienvenue sur Care</title>
        <meta
          name="description"
          content="Care - l'application qui prend soin de vous ! va vous permettre de suivre vos données importantes comme le poids, la consommation d'eau, le suivi du sommeil,..."
        />
      </Helmet>
      <NavLanding />
      <Landing displayToast={displayToast} />
      <ToastContainer />
      <Footer />
    </div>
  );
}

{
  /* <Account key={session.user.id} session={session} /> */
}
