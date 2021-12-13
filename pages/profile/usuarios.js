import swl from 'sweetalert';
import styles from './usuarios.module.css';
import {useRouter} from 'next/router';
import {useState} from 'react';
import axios from 'axios';

export default function Users(){
      const router = useRouter();
      const [data, setData] = useState();
      
      const onSearch = async () => {
            const result = await axios.post('/api/user/find',{data});
  
            result.result ? setData(result.result) : '';
                
      }

      return(
            <div className={styles.container}>
                  <div className={styles.searchContainer}>
                    <input 
                         className={styles.search}
                         type='text' 
                         placeholder='Pesquisar um usuário'
                         onChange={(e) => setData(e.target.value)}
                    />
                    <button className={styles.buscar} onClick={onSearch}>Buscar</button>

                    <div className={styles.content}>
                        <img src={'/uploads/'+data ? data.avatar : ''} />
                        <p>{data.name}</p>
                    </div>
               </div>
            </div>
      );
}