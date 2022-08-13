import Link from 'next/link';
import { supabase } from '../utils/supabase';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import logo from '../public/assets/images/logo.png';
import menu from '../public/assets/images/menu.png';
import close from '../public/assets/images/close.png';

const NavAccueil = ({ water, weight, lastname }) => {
  const [show, setShow] = useState(false);

  

  const router = useRouter();

  return (
    <div className="flex top-0 w-screen flex-col items-center justify-between z-50  pt-5 text-white  bg-black" style={{height: show ? "100%" : "80px", overflow : show ? "hidden" : "visible", position: show ? "fixed" : "initial"}}>
      <div className="flex  items-center justify-between w-11/12 mx-auto  ">
        <Image src={logo} alt="logo" height={40} width={80} />
        <button onClick={() => setShow(!show)}>
          {show === false && (
            <Image src={menu} alt="add" height={40} width={40} />
          )}
          {show === true && (
            <div className="p-1.5">
              <Image src={close} alt="add" height={30} width={30} />
            </div>
          )}
        </button>
      </div>
      {show && (
        <div className="flex  flex-col h-96 text-xl  items-center justify-around absolute pt-40">
          {lastname !== null && (
            <Link
              className="flex items-center  h-12 px-3 font-prompt hover:rounded-sm hover:text-nav hover:bg-white hover:shadow-sm"
              href="/dashboard"
            >
              <a className='hover:text-red-400'>Dashboard</a>
            </Link>
          )}
          {weight !== null && (
            <Link
              className="flex items-center h-12 px-3 font-prompt hover:rounded-sm hover:text-nav hover:bg-white hover:shadow-sm"
              href="/suivi-poids"
            >
              <a className='hover:text-red-400'>Suivi poids</a>
            </Link>
          )}{' '}
          {water !== null && (
            <Link
              className="flex items-center h-12 px-3 font-prompt hover:rounded-sm hover:text-nav hover:bg-white hover:shadow-sm"
              href="/suivi-eau"
            >
              <a className='hover:text-red-400'>Suivi eau</a>
            </Link>
          )}{' '}
          <Link
            className="flex items-center h-12 px-3 font-prompt hover:rounded-sm hover:text-nav hover:bg-white hover:shadow-sm"
            href="/profil"
          >
            <a className='hover:text-red-400'>Mon profil</a>
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
      )}
    </div>
  );
};

export default NavAccueil;
