import { useState,useEffect } from 'react';
import {useRouter} from 'next/router';

import LeadingPage  from './leading/leading';
import AxiosConfig from '../config';

export default function Home() {
  const router = useRouter();
  const [myId,setId] = useState();

  useEffect(() => {
    AxiosConfig();
    let auxId = sessionStorage.getItem('tokenId');
    setId(auxId);
  } ,[]);

  return (
      myId ? router.push(`/feed/${myId}`): <LeadingPage /> 
  );
}


