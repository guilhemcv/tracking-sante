import { Footer } from '../components/Footer';
import NavAccueil from '../components/NavBar';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../utils/supabase';
import { TestCircle } from '../components/testCircle';
import Image from 'next/image';
import WaterWave from '../components/WaterWave';
import poids from '../public/assets/images/weight.png';
import go from '../public/assets/images/logout.png';
import hello from '../public/assets/images/hello-world.png';

export default function Dashboard() {
  const [session, setSession] = useState(null);
  const [waterToDrink, setWaterToDrink] = useState(null);
  const [weight, setWeight] = useState([]);
  const [height, setHeight] = useState(null);
  const [water, setWater] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dernierePesee, setDernierePesee] = useState(null);
  const router = useRouter();

  console.log(lastName, water, weight);

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

  useEffect(() => {
    if (weight.length > 0) {
      const lastWeight = parseInt(weight[weight.length - 1].poids);
      setDernierePesee(lastWeight);
      setWaterToDrink((lastWeight - 20) * 15 + 1500);
    }
  }, [weight]);

  console.log(waterToDrink);

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
        setWeight(
          data.weight !== null
            ? data.weight.sort((a, b) => new Date(a.date) - new Date(b.date))
            : []
        );
        setWater(data.water === null ? [] : data.water);
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

  return (
    session && (
      <div>
        <NavAccueil />

        <div className="grid lg:grid-cols-3  xl:grid-cols-4 md:grid-cols-2 mt-10 md:mb-40 gap-y-5 ">
          <div
            onClick={() => router.push('/profil')}
            className=" p-4 w-80 mx-auto hover:scale-110 ease-in duration-300 cursor-pointer"
          >
            <div className="p-8 h-72 bg-white rounded shadow-md flex flex-col items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">
                Salut {lastName} !
              </h2>
              <Image src={hello} alt="hello" width={100} height={100} />
              <div className="flex flex-col items-center">
                <h2 className="text-xl font-bold">{dateString}</h2>
                <h2 className="text-xl font-bold">{timeString}</h2>
              </div>
            </div>
          </div>
          {weight.length > 0 && (
            <>
              <div
                onClick={() => router.push('/suivi-poids')}
                className="p-4 w-80 mx-auto hover:scale-110 ease-in duration-300 cursor-pointer	"
              >
                <div className="	 p-8 h-72 bg-white rounded shadow-md flex flex-col items-center justify-between">
                  <h2 className="text-2xl text-center font-bold text-gray-800">
                    Votre dernière pesée
                  </h2>
                  <Image src={poids} alt="poids" width={100} height={100} />
                  <p className="text-xl font-bold">{dernierePesee} kg</p>
                </div>
              </div>
              <div className=" p-4 w-80 mx-auto">
                <div className="p-8 h-72 bg-white rounded shadow-md flex flex-col items-center justify-between">
                  <TestCircle
                    height={height !== null && height}
                    weight={weight.length > 0 && weight[weight.length - 1]}
                  />
                </div>
              </div>
            </>
          )}
          {water.length > 0 && (
            <div
              onClick={() => router.push('/suivi-eau')}
              className=" p-4 w-80 mx-auto cursor-pointer hover:scale-110 ease-in duration-300  "
            >
              <div className="p-8 h-72 bg-white rounded shadow-md flex flex-col items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800 text-center">
                  Conso d&apos;eau <br />
                  journalière
                </h2>
                <WaterWave water={water} waterToDrink={waterToDrink} />
                <div className="flex justify-end w-full hover:animate-bounce cursor-pointer"></div>
              </div>
            </div>
          )}

          {/* {lastName === '' && firstName === '' ? (
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
        <WaterWave />
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
       */}
        </div>

        <Footer />
      </div>
    )
  );
}
