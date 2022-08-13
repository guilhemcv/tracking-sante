import Link from 'next/link';
import { supabase } from '../utils/supabase';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import logo from '../public/assets/images/logo.png';


const NavAccueil = ({ water, weight, lastname }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-between w-auto  pt-5 text-white md:flex-row md:pt-0 md:h-16 bg-black">
      <div className="flex  items-center justify-center  md:ml-5">
       <Image src={logo} alt="logo" height={40} width={80} />
      </div>
      <div className="flex flex-col md:flex-row items-center justify-around md:mr-5 md:w-2/3 lg:w-1/2">
        {lastname !== null && (
          <Link
            className="flex items-center h-12 px-3 font-prompt hover:rounded-sm hover:text-nav hover:bg-white hover:shadow-sm"
            href="/dashboard"
          >
            <a>Dashboard</a>
          </Link>
        )}
        {weight !== null && (
          <Link
            className="flex items-center h-12 px-3 font-prompt hover:rounded-sm hover:text-nav hover:bg-white hover:shadow-sm"
            href="/suivi-poids"
          >
            <a>Suivi poids</a>
          </Link>
        )}{' '}
        {water !== null && (
          <Link
            className="flex items-center h-12 px-3 font-prompt hover:rounded-sm hover:text-nav hover:bg-white hover:shadow-sm"
            href="/suivi-eau"
          >
            <a>Suivi eau</a>
          </Link>
        )}{' '}
        <Link
          className="flex items-center h-12 px-3 font-prompt hover:rounded-sm hover:text-nav hover:bg-white hover:shadow-sm"
          href="/profil"
        >
          <a>Mon profil</a>
        </Link>{' '}
        <div>
          <button
            className="bg-orange-500 hover:bg-orange-700 text-sm py-1 px-2 rounded mt-5 mb-5"
            onClick={() => {
              supabase.auth.signOut();
              router.push('/');
            }}
          >
            Déconnexion
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavAccueil;
