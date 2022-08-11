import Link from 'next/link';

const NavLanding = () => {
  return (
    <div className="flex flex-col items-center justify-between w-auto h-32 pt-5 text-white md:flex-row md:pt-0 md:h-16 bg-black">
      <div className="flex items-center justify-center  md:ml-5">
        {/*         <img src={playground} alt="jeu" width={40} height={40} />
         */}{' '}
        <p className="ml-2 font-prompt">Santé</p>
      </div>
      <div className="flex items-center justify-around md:mr-5 md:w-96">
        <h2>Bienvenue !</h2>
      </div>
    </div>
  );
};

export default NavLanding;
