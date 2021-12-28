import { useEffect } from 'react';
import {useRouter} from 'next/router';
import axios from 'axios';
import generatePDF from '../../utils/pdfgenereator';

import { CircularBar,VerticalBar } from '../../utils/chart';
import {ConnectToDatabase} from '../../db/connection';

import styles from './adminpanel.module.css';

export default function AppsToAcept({ apps, acepted }) {
    const router = useRouter();

    useEffect(()=>{
        if(sessionStorage.getItem('tokenId') != '61b9fc3b18798178a0abafe9'){
            router.push('/leading/leading');
        }
    },[]);

    async function onDelete(id){
        const result = await axios.post('/api/admin/resolve',{id});
        result ? router.reload(window.location.pathname) : '' ;
    }
    function onGerarPdf(acepted){
        return generatePDF(acepted);
    }
    function AppData() {
        return(
            apps.length > 0 ? apps.map(app => 
                <>
                    <div className={styles.app}>
                        <p>{app.name}</p>
                        <button onClick={() => onDelete(app._id)} className={styles.remover}>Remover</button>
                        <button onClick={() => router.push(`/apps/${app._id}`)} className={styles.verdados}>Ver dados</button>
                    </div>
                    <p className={styles.description}>{app.description}</p>
                </>
            ) : <p>Sem aplicativos cadastrados no sistema</p>
        );
    }
    function AceptedAppsDetails(){
        return(
            <div className={styles.details}>
                {acepted.map(acepted =>
                    <>
                        <img width={50} height={50} src={'/appfiles/'+acepted.acepetedApp.avatar} />
                        <p className={styles.title}>Nome do aplicativo: {acepted.acepetedApp.name}</p>
                        <div className={styles.userdata}>
                            <p className={styles.username}>Negociador: { acepted.usuariosolicitante.fullName }</p>
                            <button className={styles.downloadpdf} onClick={onGerarPdf(acepted)}>Gerar PDF</button>
                        </div>
                    </> 
                    
                )}
            </div>
        );
    }
    return(
        <div className={styles.container}>

            <div className={styles.chart}>
                <h4>{`Gráfico dos ${apps.length} aplicativos do sistema`}</h4>
                <CircularBar type='doughnut' data={apps}/>
                <h4>{`Gráfico dos ${acepted.length} aplicativos cujas negociações foram aceites no sistema`}</h4>
                <VerticalBar type='line' data={acepted}/>
            </div>

            <div className={styles.pdf}>
                <input type='text' placeholder='Pesquisar um aplicativo' className={styles.input}/>
                <div className={styles.appSection}>
                    {/* Apps listening and remove */}
                    <h4>Aplicativos do sistemas</h4>
                    <AppData />
                    <h4>Aplicativos com negociações fechadas</h4>
                   < AceptedAppsDetails />
                </div>
            </div>
        </div>
    )
}
export const getServerSideProps = async () => {

    const db = await ConnectToDatabase();
    let apps = await db.collection('apps').find({}).toArray();
    let acepted = await db.collection('acepted').find({}).toArray();
    apps = JSON.parse(JSON.stringify(apps));
    acepted = JSON.parse(JSON.stringify(acepted));
    
    return {
        props: {
           apps,
           acepted
        }
    }
}