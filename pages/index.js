
import Feed from './feed/feed'
import LeadingPage from './leading/leading'

export default function Home() {

  const [user, setUser] = useState({token:'wertyulop09483'})

  useEffect(() => {
    //search user on Cookies
    //use the user, with bantu-marketplace
    //if has user 
    //setUser
  })

  return (
    // user !== {} ? <Feed /> : <LeadingPage />
    <LeadingPage />
  );
}

