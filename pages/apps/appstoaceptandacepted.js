import { useEffect } from 'react'
import axios from 'axios'

import styles from 'appstoaceptandacepted.module.css' 

export default function appstoaceptandacepted({ aceptedApps, appstToAcept }){

    useEffect(() => {/*unserialliaze both apps, acepted and to acept*/})

    return (
        <div className={styles.container}>
            {/* flex on left, and map it  */}
            <div className={styles.appsToAcept}>
                <div className={styles.imageAndNameApp}>
                    <img href={`./public/camera.png`} />
                    <h1>Some name apps</h1>
                </div>
                <p>description</p>
            </div>
            {/* flex it on right and map it  */}
            <div className={styles.appsAcepted}>
                <img href={`./public/camera.png`} />
                <h1>Some name app</h1>
            </div>

        </div>

    )
}

const getServerSideProps = async (context) => {

    const aceptedApps = []

    const appstToAcept = []

    return {
        props:{
            aceptedApps,
            appstToAcept
        }
    }
}