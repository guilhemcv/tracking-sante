import React, { useState } from 'react';

export const Cookie = () => {
  const [cookie, setCookie] = React.useState(true);
  return (
    cookie && (
      <div className='bg-gray-800 w-96 flex flex-col items-center justify-around fixed bottom-0 right-0 mr-2 mb-2 z-50 rounded-sm p-10'>
        <h2 className='text-white text-center mb-5'>Salut ! c&apos;est nous les cookies ! 🍪</h2>
        <p className='text-white text-center mb-5'>
          Ce site web utilise les cookies. Ils permettent de personnaliser le
          contenu pour une navigation optimale !
        </p>
        <button className='w-40 h-8 rounded-sm bg-green-500 text-white hover:bg-green-900' onClick={() => setCookie(false)}>accepter</button>
      </div>
    )
  );
};