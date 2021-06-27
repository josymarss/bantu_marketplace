import {useState,useEffect,Fragment} from 'react'
import Link from 'next/link'

import styles from './leading.module.css'

export default function LeadingPage(){
    return(
        <div className={styles.container}>
           <section className={styles.header}>
               <div className={styles.info}>
                    <h2>Desenvolva seu <span>aplicativo</span> e nós o ajudamos a lançar para o <span>mundo.</span></h2>
                    <p>O melhor lugar para programadores angolanos, lançar seus aplicativos para o exterior.</p>
                        <Link href='/account/create'>
                            <a>crate account</a>
                        </Link>
               </div>
               <img src='./developer.png' />
            </section>
            <section className={styles.acionista}>
                <img src='./shareholder.png' />
                <div className={styles.content}>
                    <h1>Encontra <span>acionistas</span> para seu aplicativo</h1>
                    <p>Encontra acionistas para seu aplicativo,
pessoas específicas para lançar seu aplicativo para o exterior, e cehgar nas mãos de milhares de angolanos e não só.</p>
                </div>
            </section>
            <section className={styles.people} >
                <div className={styles.peopleContent}>
                    <h1>Conheça <span>pessoas</span> com mais habilidades que você</h1>
                    <p>Aqui você encontra outros programadores, acionistas e mais, eles te dão pontos a cada stars no teu projecto.</p>
                </div>
                <img src='./people.png' />
            </section>
            <section className={styles.moreDetails}>
                <h1>Aqui você tem opções de <span>contrato</span></h1>
                <div className={styles.detailsInfo}>
                    <p className={styles.borderText}>Gere contratos digitais</p>
                    <p className={styles.borderText}>Gere link das suas aplicações para que acionistas se interessem por ela.</p>
                    <p className={styles.borderText}>Mostra as imagens do projecto ou vídeo e ganhe um acionista.</p>
                </div>
            </section>
            <footer className={styles.footer}>{`@bantudev ${new Date().getUTCFullYear()} todos os direitos reservados`}</footer>
        </div>
        
    )
} 