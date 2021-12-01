import {useEffect,useState} from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import styles from './app.module.css';
import axios from 'axios';

export default function App({ application, userid }){
    const router = useRouter();
    const [myId,setId] = useState('');

    useEffect(()=>{
        //simulando os dados
        setId(sessionStorage.getItem('tokenId'));
    },[]);

    const onStar = async () =>{
        if(myId){
            await axios.put(`/api/apps/${application._id}`,{myId});
            router.reload(window.location.pathname);
        }
        router.push('/account/login');    
    }
    const PageApp = () => (
        <div>
        {application ? 
            <div className={styles.container}>
                <img src={application.avatar} />
                <p className={styles.name}>
                    {application.name}
                </p>
                <p className={styles.description}>
                    {application.description}
                </p>
                <p>
                { application.userId != myId ? 
                    <span>
                        <Link href={myId ? `/negociation/${application._id}`: `/account/login`}>
                            Negociar
                        </Link>
                    </span> :' ' 
                }
                </p>
                <div className={styles.star}>
                    <span>
                        <FontAwesomeIcon 
                            icon={faStar} 
                            onClick={ onStar }
                        />
                    </span> 
                    <p>{application.stars.likes}</p>
                </div>
                
            </div> 
            : 'Sem aplicativos. Adiciona um aplicativo pressionando o botão + no menu acima'
            }
        </div>)

    return(
        <PageApp />
    );
    
}
