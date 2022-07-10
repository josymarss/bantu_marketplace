import styles from './seach.module.css';
import {useRouter} from 'next/router';
import {useState,useEffect} from 'react';
import swl from 'sweetalert';
import Head from '../Head'
import axios from 'axios';

export default function Users(){
      const router = useRouter();
      const [data, setData] = useState(null);
      const [users,setUser] = useState(null);
      const [following, setFollow] = useState();
      const [myId,setId] = useState();

      let state = false;

      useEffect(() => {
            setId(sessionStorage.getItem('tokenId'));
      },[]);

      const onChange = (e) => {
            setData(e.target.value);
      }
      const onSeguir = async (id) => {
            if(id !== myId){
                  const following = await axios.put('/api/user/follow',{
                  myId,
                  idUserWhoIwantToFollow:id
            });
                  setFollow(following);
            }
      }
      const onSearch = async () => {
            const result = await axios.post('/api/user/find',{data});  
            if(result.data){
                  setUser(result.data);
                  state = true;
                  document.getElementById('input').value='';
                  return
            } 
            state = false;
            document.getElementById('input').value='';  
      }
      const ListingUsers = () => (
            users ? users.resultUsers.map(user =>
                  <div className={styles.content}>
                        <img src={'/uploads/'+user.avatar} />
                        <p onClick={() =>router.push('/profile/'+user._id)}>{user.fullName}</p>
                        {user._id !== myId ? 
                              <p 
                                    className={styles.seguir} 
                                    onClick={() => onSeguir(user._id)}>
                                          {following ? 'Seguindo': 'Seguir'}
                              </p> : ''}
                  </div>
            ) : ''
      );
      const ListingApps = () => (
            users ? users.resultApps.map(app =>
                  <div className={styles.content}>
                        <img src={'/appfiles/'+app.avatar} />
                        <p onClick={() =>router.push('/apps/'+app._id)}>{app.name}</p>
                  </div>
            ) :<p>Nada encontrado</p>
      );
      
      return(
            <>    
                  <Head title={"Pesquisar"}/>
                  <div className={styles.container}>
                        <div className={styles.searchContainer}>
                              <input 
                                    id='input'
                                    className={styles.search}
                                    type='text' 
                                    placeholder='Pesquisar um usuário'
                                    onChange={onChange}
                               />
                               <button className={styles.buscar} onClick={onSearch}>Buscar</button>
                  
                        </div>
                        <ListingUsers />
                        <ListingApps />
                  </div>
                  </>);
}