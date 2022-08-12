import Link from 'next/link';

const NavAccueil = () => {
  return (
    <div className="flex flex-col items-center justify-between w-auto h-32 pt-5 text-white md:flex-row md:pt-0 md:h-16 bg-black">
      <div className="flex items-center justify-center  md:ml-5">
        {/*         <img src={playground} alt="jeu" width={40} height={40} />
         */}{' '}
        <p className="ml-2 font-prompt">Santé</p>
      </div>
      <div className="flex items-center justify-around md:mr-5 md:w-96">
        <Link
          className="flex items-center h-12 px-3 font-prompt hover:rounded-sm hover:text-nav hover:bg-white hover:shadow-sm"
          href="/dashboard"
        >
          <a>Dashboard</a>
        </Link>
        <Link
          className="flex items-center h-12 px-3 font-prompt hover:rounded-sm hover:text-nav hover:bg-white hover:shadow-sm"
          href="/suivi-poids"
        >
          <a>Suivi poids</a>
        </Link>{' '}
        <Link
          className="flex items-center h-12 px-3 font-prompt hover:rounded-sm hover:text-nav hover:bg-white hover:shadow-sm"
          href="/suivi-eau"
        >
          <a>Suivi eau</a>
        </Link>{' '}
        <Link
          className="flex items-center h-12 px-3 font-prompt hover:rounded-sm hover:text-nav hover:bg-white hover:shadow-sm"
          href="/profil"
        >
          <a>Mon profil</a>
        </Link>{' '}
      </div>
    </div>
  );
};

export default NavAccueil;
