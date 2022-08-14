import React from 'react';
import notConnected from '../public/assets/images/cloud-computing.png';
import Image from 'next/image';
import Link from 'next/link';
import { Footer } from './Footer';
import NavLanding from './NavBarAccueil';

export const NotConnected = () => {
  return (
    <div className=" w-screen h-screen bg-black">
      <div className='w-11/12 md:w-8/12 flex flex-col items-center justify-evenly bg-white rounded mx-auto translate-y-20 p-5'>
        <h1 className="text-2xl md:text-3xl">Vous n&apos;êtes pas connecté !</h1>
        <Image
          src={notConnected}
          alt="not connected"
          height={100}
          width={100}
        />
        <h2 className="text-lg md:text-xl text-center mx-auto w-11/12">
          Aïe, il semblerait que vous ne soyiez pas connecté à Care - L&apos;appli qui prend soin de vous... <br /> Suivez le
          lien ci dessous pour vous diriger vers l&apos;accueil.
        </h2>
        <Link href="/">
          <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5 mb-5">
            <u>Accueil</u>
          </a>
        </Link>
      </div>
      <Footer />
    </div>
  );
};
