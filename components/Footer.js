import React from 'react';
import Image from 'next/image';
import linkedin from '../public/assets/images/linkedin.png';
import github from '../public/assets/images/github.png';

export const Footer = () => {
  return (
    <div className="fixed bottom-0 w-full bg-black">
      <footer className="flex items-center justify-between p-4 text-center text-white bg-nav">
        <div className="flex justify-center flex-col font-Prompt">
          <p className='text-xs md:ml-10 md:text-sm font-prompt'>Copyright - Guilhem Seyvet 2022</p>
        <a href="/politique.html" className='text-xs md:ml-10 md:text-sm font-prompt underline'>Infos cookies</a>
        </div>
        <div className="flex items-center justify-around w-20 h-full mr-2 md:mr-10">
          <a
            href="https://www.linkedin.com/in/guilhem-seyvet/"
            target="_blank"
            rel="noreferrer"
          >
            <Image src={linkedin} alt="linkedin" width={20} height={20} />
          </a>
          <a
            href="https://www.github.com/guilhemcv/"
            target="_blank"
            rel="noreferrer"
          >
            <Image src={github} alt="github" width={20} height={20} />
          </a>
        </div>
      </footer>
    </div>
  );
};
