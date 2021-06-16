import Link from 'next/link'

import styles from './reactions.module.css'

export default function Reactions({ reactions }){

      const token = 'he1g22683MAYq1bcddaf'

    return(
        <div className={styles.reactions}>
            <p className={styles.acionista}>Acionistas<span>{123}</span></p>
            <p className={styles.stars}>Stars <span>{50}</span></p>
            <Link href={ token ? '/feed/negociation' : '/account-user/login' }>
                  <a className={styles.buttonSend}>
                        Negociar
                  </a>
            </Link>
      </div>
    )
}