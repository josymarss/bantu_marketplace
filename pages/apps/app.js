import {useEffect,useState} from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import axios from 'axios';
import styles from './app.module.css';

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
                            <span><FontAwesomeIcon 
                                icon={faStar} 
                                onClick={ onStar }
                            /></span>
                            <p>{application.stars.likes}</p>
                        </div>
                    </div>
               </div>

                <div className={styles.content}>
                    <p className={styles.description}>
                        {application.description.substring(0,45)+'...'}
                    </p>
                    <a 
                        href={'www.facebook.com/kidogzone'}
                        target='_blank'
                        className={styles.link}>
                            {'Link of the appaijfiosfuyruxwumfryuf7ynx8nu8md980muxf'.substring(0,45)}
                    </a>
                </div>

                { application.userId != myId ? 
                    <button>
                        <Link href={myId ? `/negociation/${application._id}`: `/account/login`}>
                            Negociar
                        </Link>
                    </button> :' ' 
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
