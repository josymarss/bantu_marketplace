import { useRouter } from 'next/router'

import styles from '../../styles/usersearched.module.css'
import App from '../apps/app'

export default function User({ user }){
    return(
        <div className={styles.container}>
            <div className={styles.userContainer}>
                <img src='/favicon.ico' />
                <p>username</p>
            </div>
            <p>Description of the user biography</p>
            <>
                {/* List all users apps */}
            </>
        </div>
    )
}

const getServerSideProps = (context) => {
    
    const { router } = req.body 
    const idUser = router._id
    
    //search on database
    const data = fecth(`api/user${idUser}`)
    const user = data.json()
    
    return {
        props:{
            user
        }
    }
}
