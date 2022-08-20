import { Footer } from '../components/Footer';
import NavAccueil from '../components/NavBar';
import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { infoSommeil } from '../data/InfoSommeil';
import idea from '../public/assets/images/idea.png';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import add from '../public/assets/images/add.png';
import moins from '../public/assets/images/moins.png';
import { useRouter } from 'next/router';
import { Helmet } from 'react-helmet';
import { NotConnected } from '../components/NotConnected';
import NightTrack from '../components/NightTrack';

export default function SuiviEau() {
  const [loading, setLoading] = useState(true);
  const [night, setNight] = useState([]);
  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const [heures, setHeures] = useState(null);
  const [minutes, setMinutes] = useState(null);
  const [hourToSave, setHourToSave] = useState(null);
  const [random, setRandom] = useState();
  const [added, setAdded] = useState(false);
  const [nightSelected, setNightSelected] = useState(false);
  const [nbVerres, setNbVerres] = useState(0);
  const router = useRouter();
  const [session, setSession] = useState(null);


  const date = new Date();
  const yesterday = new Date(
    date.setDate(date.getDate() - 1)
  ).toLocaleDateString();

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    if (night.length > 0 && night.find((item) => item.date === yesterday)) {
      setAlreadyAdded(true);
    }
    setRandom(infoSommeil[Math.floor(Math.random() * infoSommeil.length)].info)
  }, [night, yesterday]);

  useEffect(() => {
    if (minutes === null) {
      setMinutes("00");
    }
    if (minutes !== null && minutes.length !== 2) {
      setMinutes(`0${minutes}`);
    }
    if (night.length === 0) {
      setHourToSave([{ date: yesterday, nuit: heures + ':' + minutes }]);
    } else {
      setHourToSave([
        ...night,
        { date: yesterday, nuit: heures + ':' + minutes },
      ]);
    }
  }, [heures, minutes, night, yesterday]);

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`night`)
        .eq('id', user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setNight(data.night === null ? [] : data.night);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ night }) {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      const updates = {
        id: user.id,
        night: hourToSave,
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
      toast.success(
        '🌜 Votre nuit a été rajoutée ! redirection vers le dashboard.',
        {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      setLoading(false);
      setTimeout(() => {
        router.push('/dashboard');
      }, 5000);
    }
  }

  return session ? (

    <>
      <Helmet>
        <title>Care - Suivi sommeil</title>
      </Helmet>
      <NavAccueil />
      <ToastContainer />
      <div className="flex md:flex-row flex-col items-center justify-center my-10 bg-slate-100 rounded shadow-lg p-4 w-11/12 md:w-9/12 mx-auto">
        <Image src={idea} alt="idea" width={50} height={50} />
        <h1 className="md:ml-20 text-center md:text-left">
          <span className="md:text-xl font-bold">Le saviez-vous ? </span>
          <br />
          {random}
        </h1>
      </div>
      <h2 className="w-11/12 mx-auto text-center my-10 md:text-xl font-bold">
        La durée moyenne idéale d&apos;une nuit de sommeil pour un adulte est de
        7 à 9 heures. <br /> Le besoin de sommeil diffère toutefois en fonction
        de votre profil et de votre activité pendant la journée.
      </h2>
      <NightTrack night={night} />
      <p className="text-center text-xl my-20">
        Ici, vous pouvez ajouter la durée de votre dernière nuit
      </p>
      {!alreadyAdded ? (
        !nightSelected ? (
          <div className="flex  items-center justify-center w-11/12 md:justify-around mx-auto md:w-3/12 mt-10 mb-40">
            <button
              type="button"
              className="lg:mr-10"
              onClick={() => setNightSelected(true)}
            >
              <Image src={add} alt="logo ajout" width={40} height={40} />
            </button>
            <h3 className="md:text-xl font-bold text-center ml-5 md:ml-0">
              Ajouter la durée de votre dernière nuit
            </h3>
          </div>
        ) : (
          <div className="mt-20 mb-40 mx-auto md:w-11/12">
            {!added && (
              <>
                <div className="flex flex-col lg:flex-row items-center lg:w-9/12 md:w-6/12 justify-between md:justify-between mx-auto">
                  <p className="lg:mr-10 w-22 font-bold">
                    Ajouter pour la nuit du :
                  </p>
                  <p>
                    {yesterday} au {new Date().toLocaleDateString()}
                  </p>
                </div>
                <div className="flex flex-col w-11/12 md:w-6/12 justify-between md:justify-between mx-auto mt-5 mb-10 md:mb-0">
                  <p className="text-center font-bold mt-5">
                    Choisir la durée de votre nuit (heures et minutes) :
                  </p>
                  <div className="flex flex-col lg:flex-row justify-around mt-10">
                    <label htmlFor="heures">Heures :</label>
                    <input
                      className="lg:w-96 p-2 bg-white shadow-md"
                      name="heures"
                      onChange={(e) => setHeures(e.target.value)}
                      type="number"
                      min={0}
                      max={24}
                    />
                  </div>
                  <div className="flex flex-col lg:flex-row justify-around mt-5">
                    <label htmlFor="minutes">Minutes :</label>
                    <input
                      className="lg:w-96 p-2 bg-white shadow-md"
                      name="minutes"
                      onChange={(e) => setMinutes(e.target.value)}
                      type="number"
                      min={0}
                      max={59}
                    />
                  </div>
                </div>
              </>
            )}
            <div className="flex flex-col items-center justify-center">
              <>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5 mb-5"
                  type="button"
                  onClick={() => {
                    updateProfile({ night });
                    setAdded(false);
                  }}
                >
                  valider
                </button>
              </>
            </div>
          </div>
        )
      ) : (
        <div className="flex items-center justify-center mt-20 mb-40 text-center">
          <h2 className="md:text-xl font-bold">
            Vous avez déjà ajouté la nuit dernière <br /> revenez demain ! 📅
          </h2>
        </div>
      )}
      <Footer />
    </>
  ) : (
    <NotConnected />
  );
}
