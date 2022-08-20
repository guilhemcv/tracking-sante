import '../styles/globals.css';
import splitbee from '@splitbee/web';
import React, { useEffect } from 'react';

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    splitbee.init();
  }, []);
  
  return <Component {...pageProps} />;
}

export default MyApp;
