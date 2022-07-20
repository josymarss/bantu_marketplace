import { useState,useEffect } from 'react';
import {useRouter} from 'next/router';
import Head from './Head'
import LeadingPage  from './leading/leading';
import Footer from '../components/footer/footer';

export default function Home() {
  const router = useRouter();
  const [myId,setId] = useState();

  useEffect(() => {
    let auxId = sessionStorage.getItem('tokenId');
    setId(auxId);
  } ,[]);

  return (
  <>
    <Head title="bantu-marketplace"/>
      {
      myId ? router.push(`/feed/${myId}`): <LeadingPage />
      } 
  </>
  
 
  );
}


