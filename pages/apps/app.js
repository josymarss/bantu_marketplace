import styles from './app.module.css'

export default function App({ width, height, name,description,status, link, image }){
    return(
        <div className={styles.apps}>
            <div className={styles.appSection}>
                <img 
                    width={width ? width : 40} 
                    height={height ? height : 40} 
                    src={ image ? image :'/camera.png' }
                    className={styles.coverApp}
                />
                <p className={styles.appName}>{name}</p>
                <p className={styles.linkApp}>{link}</p>
                <div className={status? styles.status : ''}>

                </div>
            </div>
            <p className={styles.description}>
                { description ? description : 'This app is an essential game form Angola!'}
            </p>
        </div>
    )
}