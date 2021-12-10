import '../styles/globals.css';
import {Fragment} from 'react';
import Head from 'next/head';

import Header from '../components/header/Header';


function MyApp({ Component, pageProps }) {

  return <>
        <Header />
        <Component {...pageProps} />
    </>
}

export default MyApp
