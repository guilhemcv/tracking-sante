import { Footer } from '../components/Footer';
import NavAccueil from '../components/NavBar';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../utils/supabase';
import WeightTrack from '../components/WeightTrack';
import ImcChart from '../components/ImcChart';
import { TestCircle } from '../components/testCircle';
import Image from 'next/image';
import add from '../public/assets/images/add.png';

export default function Dashboard() {
  const [session, setSession] = useState(null);
  const [weight, setWeight] = useState([]);
  const [height, setHeight] = useState(null);
  const [water, setWater] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const newDate = new Date();
  const date = newDate.getDate();
  const monthName = new Intl.DateTimeFormat('fr-FR', { month: 'long' }).format(
    newDate
  );
  const year = newDate.getFullYear();
  const dateString = `${date}  ${monthName}  ${year}`;
  const hours = newDate.getHours();
  const minutes = newDate.getMinutes();
  const minutesString = minutes < 10 ? `0${minutes}` : minutes;
  const timeString = `${hours}:${minutesString}`;

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`weight, water, username, lastname, height`)
        .eq('id', user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setWeight(data.weight.sort((a, b) => new Date(a.date) - new Date(b.date)));
        setWater(data.water);
        setHeight(data.height);
        setLastName(data.lastname);
        setFirstName(data.username);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return session ? (
    <div>
      <NavAccueil />
      {lastName === '' && firstName === '' ? (
        <h1>
          Si vous venez de vous inscrire, compléter vos données sur
          l&apos;onglet profil
        </h1>
      ) : (
        <h1 className="text-2xl text-center my-10">
          Hello {lastName} ! on est le {dateString} et il est {timeString}.
        </h1>
      )}
      <div className="border-b-black pb-3 flex justify-between w-11/12 mx-auto mb-10 border-solid border-b-2 text-xl">
        <h2>Données sur le poids</h2>
        <div className="flex justify-end">
          <p className="mr-5">ajouter une donnée</p>
          <button onClick={() => router.push("/ajouter")}>
            <Image src={add} height={30} width={30} alt="logo ajouter" />
          </button>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-around items-center">
        <WeightTrack weight={weight} />
        <TestCircle
          height={height !== null && height}
          weight={weight.length > 0 && weight[weight.length - 1]}
        />
      </div>
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
