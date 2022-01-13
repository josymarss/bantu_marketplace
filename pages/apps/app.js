import {useEffect,useState} from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import axios from 'axios';
import styles from './app.module.css';

export default function App({ application, userid, me}){
    const router = useRouter();
    const [myId,setId] = useState('');
    const [stars, setStars] = useState(0);

    useEffect(()=>{
        //simulando os dados
        setId(sessionStorage.getItem('tokenId'));
        setStars(application.stars.likes !=0 ? application.stars.likes : '' );
    },[router.isReady]);

    const onStar = async () =>{
        if(myId){
            const result = await axios.put(`/api/apps/${application._id}`,{myId});
            setStars(result.data);
            router.reload(window.location.pathname);
            return
        }
        router.push('/account/login');    
    }

    const AddToFavorits = async () => {
        let id =  application._id;
        await axios.post('/api/apps/favorits',{
           id
        });
    }

    const PageApp = async () => (
        application ? 

            <div className={styles.container}>
                {/* Name of the app an stars */}
               <div className={styles.headernameandphoto}>
                   {/* The image  */}
                    <img 
                        className={styles.containerimg}
                        src={application.avatar ? `/appfiles/${application.avatar}`:''}
                    />
                 
                   {/* Name and stars */}
                   <div className={styles.nameandstars}>
                        <p onClick={() => router.push('/apps/'+application._id)} className={styles.name}>
                            {application.name}
                        </p>
                        <div className={styles.star}>
                            {myId != application.userId ?<p className={styles.btnStart} onClick={onStar}>curtir</p>:''}
                            <span> <FontAwesomeIcon icon={faStar}/></span>
                            <p>{application.stars.likes}</p>
                            
                        </div>
                    </div>
               </div>

                <div className={styles.content}>
                    <p className={styles.description}>
                        {application.description.substring(0,45)+'...'}
                    </p>
                    <a
                        target='_blank'
                        className={styles.link} 
                        target='_blank' 
                        href={application.link.replace('http://localhost:3000/apps/','')}
                        rel="noopener noreferrer">
                            {application.link.substring(0,45)}
                    </a>
                </div>

                { application.userId != myId ? 
                    <>
                        <button>
                            <Link href={myId ? `/negociation/${application._id}`: `/account/login`}>
                                Negociar
                            </Link>
                        </button>
                        <button>
                            <Link href={myId ? AddToFavorits : `/account/login`}>
                                Adicinar aos favoritos
                            </Link>
                        </button>
                    </>
                     :' ' 
                }
            </div> :

            <p>
                Sem aplicativos. Adiciona um aplicativo pressionando o botão + no menu acima'
            </p>

       )

    return(
        <PageApp />
    );
    
}
