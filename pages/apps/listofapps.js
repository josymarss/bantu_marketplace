import { useEffect } from 'react'
import axios from 'axios'

import App from './apps'
import  styles  from './listofapps.module.css'

export default function ListOfApps({ apps }){

useEffect(() => {/* don't forget to unseriallize to JSON.parse the apps var */})

     return (
        <div className={styles.container}>// put it flex wrap to break into another line
            <div className={styles.appSection}> /the section that will be gray
                <div className={styles.imageSection}>
                    <img href={`./public/camera.png`} />
                    <h1>App name</h1>
                </div>
                <p>Some deescription</p>
            </div>    
        </div>
     );
}


const getServerSideProps = async (context) => {

    const apps = []

    // don't forget to seriallize to JSON.stringify

    return {
        props:{
            apps
        }
    }
}