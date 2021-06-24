import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

import styles from 'newapp.module.css'

export default function NewApp () {
    
    const [name, updateName] = useState('')
    const [description, updateDescription] = useState('')
    const [link, updateLink] = useState('')
    const [href, updateHref] = useState('')
    
    const myId = Cookies.get('tokenId')

    const onLoad = (e) => {
        updateHref(URL.createObjectURL(e.target.files[0]))
    }

    return (
        <div className={styles.container}>
            <h2>Fazer upload dos dados de um novo aplicativo</h2>
            <div className={styles.image}>
                <img href={ href ? href : '/camera.png'}/>
                <input type='file' onChange={onLoad} />
            </div>
            <div className={styles.inputText}>
                <input type='text' onChange={e => updateName(e.target.value)}/>
                <input type='text' onChange={e => updateLink(e.target.value)}/>
                <input type='text' onChange={e => updateDescription(e.target.value)} />
            </div>
            <button onClick={axios.post('/api/admin/appstoacept',{
                name,
                description,
                link,
                reactions:{},
                href,
                negociations:[],
                myId
            })}>
                Criar 
            </button>
            
        </div>
    )
} 

