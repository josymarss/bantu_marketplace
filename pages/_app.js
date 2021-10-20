import '../styles/globals.css'
import Header from '../components/header/Header'
import Apps from '../components/app/Apps'

function MyApp({ Component, pageProps }) {
  return <>
      <Header />
      <Component {...pageProps} />
    </>
}

export default MyApp
