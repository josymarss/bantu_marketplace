import {useState,useEffect,Fragment} from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage,faFileContract,faLink } from '@fortawesome/free-solid-svg-icons';

import styles from './leading.module.css'

export default function LeadingPage(){
    return(
        <div className={styles.container}>
           <section className={styles.header}>
               <div className={styles.info}>
                    <h2>Desenvolva seu <span>aplicativo</span> e nós o ajudamos a lançar para o <span>mundo.</span></h2>
                    <p>O melhor lugar para programadores angolanos, lançar seus aplicativos para o exterior.</p>
                   <div className={styles.acountdetails}>
                       
                            <Link href='/account/create'>
                                    <a>Create account</a>
                            </Link>
                   </div>
               </div>
               <img src='./developer.png' />
            </section>
            <section className={styles.acionista}>
                <img src='./shareholder.png' />
                <div className={styles.content}>
                    <h1>Encontra <span>acionistas</span> para lançar seus aplicativos nas lojas internacionais</h1>
                    <p>Encontra acionistas para seu aplicativo,
pessoas específicas para lançar seu aplicativo para o exterior, e cehgar nas mãos de milhares de angolanos e não só.</p>
                </div>
            </section>
            <section className={styles.people} >
                <div className={styles.peopleContent}>
                    <h1>Conheça <span>pessoas</span> com mais habilidades, e mindset tecnológicas para aumentar suas chances de crescer no mercado</h1>
                    <p>Aqui você encontra outros programadores, acionistas, empresários, esusiastas da área e  muito mais, eles te dão pontos a cada stars no teu projecto.</p>
                </div>
                <img src='./people.png' />
            </section>
            <section className={styles.moreDetails}>
                <img src='./crayon-1543.png' />
                <h1>Aqui você tem opções de <span>contrato</span></h1>
                <div className={styles.detailsInfo}>
                    <div className={styles.iconwithtext}>
                        <span><FontAwesomeIcon icon={faFileContract}/></span>
                        <p>Gere contratos digitais</p>
                    </div>
                    <div className={styles.iconwithtext}>
                    <span><FontAwesomeIcon icon={faLink}/></span>
                        <p>Gere link das suas aplicações para que acionistas se interessem por ela.</p>
                    </div>
                    <div className={styles.iconwithtext}>
                        <span><FontAwesomeIcon icon={faImage}/></span>
                        <p>Mostra as imagens do projecto ou vídeo e ganhe um acionista.</p>
                    </div>
                </div>
            </section>
            <footer className={styles.footer}>{`@bantudev ${new Date().getUTCFullYear()} todos os direitos reservados`}</footer>
        </div>
        
    )
} 