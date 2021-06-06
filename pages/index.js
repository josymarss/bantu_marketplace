import {useEffect,useState} from 'react'

import Feed from './feed/feed'
import LeadingPage from './leading'

export default function Home() {

  const [user, setUser] = useState({})

  useEffect(() => {
    //search user on Cookies
    //use the user, with bantu-marketplace
    //if has user 
    //setUser
  })

  return (
    user !== {} ? <Feed /> : <LeadingPage />
  );
}

