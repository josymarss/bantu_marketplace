import '../styles/globals.css';
import { Fragment, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Header from '../components/header/Header';
import { createContext } from 'react';

export const AppContext = createContext(null);

function MyApp({ Component, pageProps }) {
  const [refreshMenu, setRefreshMenu] = useState(0);
  const [element, setElement] = useState(1);

  return (
    <Fragment>
        <AppContext.Provider value= {{refreshMenu, setRefreshMenu, element, setElement}}>
          <Header />
          <Component {...pageProps} />
          <ToastContainer/>
        </AppContext.Provider>
    </Fragment>
  );
}
export default MyApp
