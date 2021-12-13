import styles from './reajustar.module.css';
import {useState} from 'react';
import axios from 'axios';
import swl from 'sweetalert';

export default function Reajustar(){
      const [desc,setDescription] = useState();

      const onReajust = async() =>{
            const result = await axios.put('/api/negociation/status',{desc});
      }
      
      return (
            <div className={styles.container}>
                  <h2>Reajustar negociação</h2>
                  <input 
                        type='textarea' rows="14" cols="25"
                        name='descricao' 
                        placeholder='Descreva seu reajuste de negociação' 
                        className={styles.input}
                        onChange={e => setDescription(e.target.value)}
                  />
                  <button onClick={onReajust} className={styles.btnnegociar}> Negociar </button>
            </div>
      );
}