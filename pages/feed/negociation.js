import {useState} from 'react'

export default function negociation(){

    const [description, setDescription] = useState('')
    
    const onSendNegociation = () =>{
        e.preventDefault()
        fecth('/api/newnegociation',{
            body: JSON.stringify({
              description
            }),
            headers: {
              'Content-Type': 'application/json'
            },
            method: 'POST'
          })   
    }
    return(
        <form onSubmit={onSendNegociation}>
            <input
                type='text' 
                onChange={e => setDescription(e.target.value)}
            />
            <button onClik={onSendNegociation}>Send negociation</button>
        </form>
    )
    
}