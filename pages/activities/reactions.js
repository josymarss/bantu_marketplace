import Link from 'next/link'

import styles from '../../styles/reactions.module.css'

export default function Reactions({ reactions }){
    return(
        <div className={styles.reactions}>
                  <p className={styles.acionista}>Acionistas<span>{123}</span></p>
                  <p className={styles.stars}>Stars <span>{50}</span></p>
                  <Link href='/negociation'>
                        <a className={styles.buttonSend}>
                              Negociar
                        </a>
                  </Link>
            </div>
    )
}