import { Footer } from '../components/Footer';
import NavAccueil from '../components/NavBar';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../utils/supabase';
import TestCircle from '../components/TestCircle';
import Image from 'next/image';
import WaterWave from '../components/WaterWave';
import poids from '../public/assets/images/weight.png';
import hello from '../public/assets/images/hello-world.png';
import moon from '../public/assets/images/moon.png';
import imgCalories from '../public/assets/images/calories.png';
import { Helmet } from 'react-helmet';
import { NotConnected } from '../components/NotConnected';

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
  const [sexe, setSexe] = useState(null);
  const [age, setAge] = useState(null);
  const [night, setNight] = useState(null);
  const [calories, setCalories] = useState(null);
  const [activity, setActivity] = useState(null);
  const [lastNight, setLastNight] = useState(null);
  const [wait, setWait] = useState(true);
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

  const waiting = () => {
    setTimeout(() => {
      setWait(false);
    }, 3000);
  };

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    getProfile();
    return () => {
      waiting();
    };
  }, [session]);

  useEffect(() => {
    if (weight.length > 0) {
      const lastWeight = parseInt(weight[weight.length - 1].poids);
      setDernierePesee(lastWeight);
      setWaterToDrink((lastWeight - 20) * 15 + 1500);
    }
  }, [weight]);

  async function getProfile() {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      let { data, error, status } = await supabase
        .from('profiles')
        .select(
          `weight, water, username, lastname, height, sexe, age, activity, night`
        )
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
        setSexe(data.sexe);
        setAge(data.age);
        setActivity(data.activity);
        setNight(data.night);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  console.log(weight, water, night);

  useEffect(() => {
    //set lastNight with last index of night
    if (night !== null && night.length > 0) {
      const lastNight = night[night.length - 1];
      setLastNight(lastNight);
    }
  }, [night]);

  console.log(lastNight);
  console.log(night);

  useEffect(() => {
    let intensity = 0;
    if (activity === 'peu actif') {
      intensity = 1.2;
    } else if (activity === 'moyen actif') {
      intensity = 1.375;
    } else if (activity === 'actif') {
      intensity = 1.55;
    } else if (activity === 'tres actif') {
      intensity = 1.9;
    }

    if (sexe === 'masculin' && weight.length > 0 && height !== null) {
      setCalories(
        Math.trunc(
          (9.74 * weight[weight.length - 1].poids +
            172.9 * (height / 100) -
            4.737 * age +
            667.051) *
            intensity
        )
      );
    }
    if (sexe === 'feminin') {
      setCalories(
        ((9, 740 * weight[weight.length - 1].poids) +
          17.29 * height -
          4.737 * age +
          667.051) *
          intensity
      );
    }
  }, [sexe, weight, height, age, activity]);

  console.log(calories);

  return session ? (
    <div>
      <Helmet>
        <title>Care - Dashboard</title>
      </Helmet>
      <NavAccueil />

      <div className="grid lg:grid-cols-3  xl:grid-cols-3 md:grid-cols-2 mt-10 mb-40 gap-y-5 ">
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
        {weight.length === 0 &&
          height === null &&
          lastName === null &&
          sexe === null &&
          age === null &&
          activity === null &&
          wait && (
            <div
              onClick={() => router.push('/profil')}
              className=" p-4 w-80 mx-auto cursor-pointer hover:scale-110 ease-in duration-300  "
            >
              <div className="p-8 h-72 bg-red-500 rounded shadow-md flex flex-col items-center justify-between">
                <h2 className="text-2xl font-bold text-white text-center">
                  Pour profiter de l&apos;application <br />
                  pensez a completer tous les éléments du profil en cliquant
                  ici.
                </h2>
              </div>
            </div>
          )}
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

        <div
          onClick={() => router.push('/suivi-sommeil')}
          className=" p-4 w-80 mx-auto cursor-pointer hover:scale-110 ease-in duration-300  "
        >
          <div className="p-8 h-72 rounded shadow-md bg-gray-900 flex flex-col items-center justify-between">
            <h2 className="text-xl font-bold text-gray-100  text-center">
              Temps de sommeil <br />
              de la nuit dernière
            </h2>
            <Image src={moon} alt="moon" width={100} height={100} />
            <p className="text-2xl font-bold text-gray-100">
              {lastNight !== null
                ? `${lastNight.nuit.split(':')[0]}h${
                    lastNight.nuit.split(':')[1]
                  }`
                : '00h00'}
            </p>
          </div>
        </div>

        <div className=" p-4 w-80 mx-auto ">
          <div className="p-8 h-72 rounded shadow-md bg-white flex flex-col items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900  text-center">
              Calories quotidiennes <br />à dépenser
            </h2>
            <Image src={imgCalories} alt="moon" width={100} height={100} />
            <p className="text-2xl font-bold text-gray-800">
              {age !== null && sexe !== null ? `${calories} kcal` : '0'}
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  ) : (
    <NotConnected />
  );
}
