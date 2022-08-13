import Image from 'next/image';
import logo from '../public/assets/images/logo.png';

const NavLanding = () => {
  return (
    <div className="flex flex-col items-center justify-evenly w-auto h-40  text-white md:flex-row md:pt-0 md:h-16 bg-black">
      <div className="flex items-center justify-center  md:ml-5">
        {/*         <img src={playground} alt="jeu" width={40} height={40} />
         */}{' '}
        <Image src={logo} alt="logo" height={40} width={80} />
      </div>
      <div className="flex items-center justify-around  md:mr-5 md:w-96">
        <h2>L'appli qui prend soin de vous !</h2>
      </div>
    </div>
  );
};

export default NavLanding;
