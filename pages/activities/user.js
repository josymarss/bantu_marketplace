import Link from 'next/link'
import styles from '../../styles/user.module.css'

export default function User({ user }){

    return (
        <div className={styles.user}>
            <div className={styles.image}>
                <img width={45} height={45} src='/favicon.ico' className={styles.coverImage}/>
            </div>
            <Link href='/user' >
                <h1 className={styles.userName}>@username</h1>
            </Link>
        </div>
    )
}