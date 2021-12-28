import styles from './reajustar.module.css';
import {useState} from 'react';
import {useRouter} from 'next/router';
import axios from 'axios';
import swl from 'sweetalert';

export default function Reajustar(){
      const [desc,setDescription] = useState();
      const router = useRouter();

      const onReajust = async() =>{
            const result = await axios.put('/api/negociation/status',{
                  idnegociation:router.query.id,
                  desc
            });
            if(result){
                  swl({
                        title:'Sucesso!',
                        text:`Negociação editada com sucesso.`,
                        icon:'success'
                  })
                  setTimeout(() =>{
                        router.push('/');
                  },3000);
            }
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