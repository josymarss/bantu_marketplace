import '../styles/globals.css';
import { Fragment, useState } from 'react';
import { ToastContainer } from 'react-toastify';

import Header from '../components/header/Header';
import { createContext } from 'react';

export const RefreshMenuContext = createContext(null);

function MyApp({ Component, pageProps }) {
  const [refreshMenu, setRefreshMenu] = useState(0);

  return (
    <Fragment>
        <RefreshMenuContext.Provider value= {{refreshMenu, setRefreshMenu}}>
          <Header />
          <Component {...pageProps} />
          <ToastContainer/>
        </RefreshMenuContext.Provider>
    </Fragment>
  );
}

export default MyApp
