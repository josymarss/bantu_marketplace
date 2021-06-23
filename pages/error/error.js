import styles from './index.module.css'

export default function Error({message, sugestion}){
    return(
        <div className={styles.container}>
            <p className={styles.message}>{message}</p>
            <p className={styles.sugestion}>{sugestion}</p>
        </div>
    )
}