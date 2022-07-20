import '../styles/globals.css';
import 'antd/dist/antd.css';
import { Fragment } from 'react';
import { ToastContainer } from 'react-toastify';

import Header from '../components/header/Header';


function MyApp({ Component, pageProps }) {

  return (
    <Fragment>
        <Header />
        <Component {...pageProps} />
        <ToastContainer/>
    </Fragment>
  );
}

export default MyApp
