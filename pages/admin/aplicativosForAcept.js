import adminpanel from './adminpanel.module.css'
import { useState, useEffect } from 'react'
import axios from 'axios'




const AplicativosForAcept = ({app}) => {
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


    const  onAcept = async ()=> { 
        try { 
         await axios.post('/api/admin/aceptedapps',
        {
           name,
           description,
           link,
           reactions:{
               users:[],
               likes:0
           },
           negociations,
           myId
       }, ) } catch(e){
              console.log(e)
       }
    }

    const  onRegected = async ()=> { 
         
        try { 
            await axios.post('/api/admin/rejectedapp',
           {
              name,
              description,
              link,
              reactions:{
                  users:[],
                  likes:0
              },
              negociations,
              myId
          }, ) } catch(e){
                 console.log(e)
          }

    }

    return (

    <div >  
        <h3>{app.name}</h3>
        <p> {app.description}   </p> 
        <button   onClick ={onAcept} className={adminpanel.blue} >
             Aceitar 
        </button>
        <button  onClick ={onRegected} className={adminpanel.red}>
            Rejeitar
        </button>
        <hr></hr>
    </div>
    );
}

export default AplicativosForAcept;
