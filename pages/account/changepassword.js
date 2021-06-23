import { useStrate } from 'react'
import {useRouter} from 'next/router'

import { db } from '../../db/connection'

export default function Change({ _id }){

    const router = useRouter()
    const [password, updatePassword] = useState('')
    const [confirmPassword, setUpdatePassword] = useState('')

    const onsaveChanges = async () => {
        
    if(password === confirmPassword){
        const result = await fetch(`/api/account/changepassword`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                _id,
                password
            })
        })
            //save on local storage the token
            result.tokenId ? router.push(`/profile/${_id}`) : '/account/create'
        }else{
            alert('As palavras passes devem ser iguais!')
        }
    }
    return(
        <form onSubmit={onsaveChanges}>
            <input 
                type='password' 
                placeholder='newpassword' 
                onChange={e => updatePassword(e.target.value)} 
            />
            <input 
                type='confirmpassword' 
                placeholder='confirmnewpassword' 
                onChange={e => setUpdatePassword(e.target.value)}
            />
        </form>
    )
}

const getServerSideProps = async (context) => {
    const { _id } = context.query
    return{
        props:{
            _id
        }
    }
}