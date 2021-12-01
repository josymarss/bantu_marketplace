import {useEffect,useState} from 'react';

import styles from './search.module.css'
import App from '../apps/app';

export default function Search({result}){  
    const [myId, setId ] = useState();

    useEffect(()=> setId(sessionStorage.getItem('tokenId')),[]);
    
    return(
        <div className={styles.searchContainer}>
            <h2>Resultado encontrado </h2>
            <div className={styles.result}>
                {result? 
                    result.map(app => <App application={app} userid={myId}/>)
                    : <p>'Nada econtrado'</p>
                }
            </div>
        </div>
    )
}

export function getServerSideProps (context) {
    const result = context.params.result;
    console.log('Mostrando result na pagina:',result);
    return {
        props:{
            result
        }
    }
}