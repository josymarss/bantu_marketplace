import { useState,useEffect } from 'react';
import {useRouter} from 'next/router';

import LeadingPage  from './leading/leading';

export default function Home() {
  const router = useRouter();
  const [myId,setId] = useState();

  useEffect(() => {
    let auxId = sessionStorage.getItem('tokenId');
    setId(auxId);
  } ,[]);

  return (
      myId ? router.push(`/feed/${myId}`): <LeadingPage /> 
  );
}


