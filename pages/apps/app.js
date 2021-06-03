import styles from '../../styles/app.module.css'

export default function App({ width, height, name,description,status}){
    return(
        <div className={styles.apps}>
            <div className={styles.appSection}>
                <img 
                    width={width ? width : 40} 
                    height={height ? height : 40} 
                    src='/favicon.ico' 
                    className={styles.coverApp}
                />
                <p className={styles.appName}>{name}</p>
                <div className={status?styles.status:''}>
                    {/* <style jsx>
                        `
                        
                        `
                    </style> */}
                </div>
            </div>
            <p className={styles.description}>{description?'This app is an essential game form Angola!':' '}</p>
        </div>
    )
}