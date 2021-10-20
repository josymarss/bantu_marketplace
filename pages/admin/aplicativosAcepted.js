import adminpanel from './adminpanel.module.css'
import { useState, useEffect } from 'react'


const AplicativosAcepted = ({app}) => {
    const [idApp, updateidApp] = useState('')
    const [name, updateName] = useState('')
    const [description, updateDescription] = useState('')
    const [link, updateLink] = useState('')
    const [reactions, updateReactions] = useState({})
    // const [href, updateHref] = useState('')
    const [negociations, updatenegociations] = useState([])
    const [myId, updateMyId] = useState('')

    
    

    useEffect(()=>{
            updateidApp(app._id)
            updateName(app.name)
            updateDescription(app.description)
            updateLink(app.link)
            updateidApp(app.reactions)
            // updateHref(app)
            updatenegociations(app.negociations)
            updateMyId(app.myId)
           

    },[])

    return (

    <div >  
        <h3>{app.app.name}</h3>
        <p> {app.app.description}   </p> 

        <hr></hr>
    </div>
    );
}

export default AplicativosAcepted;