import {useState} from 'react'
import style from './profile.module.css'

export default function Profile(){
      
      const [name, href ] = useState()

      
      return(
            <>

            <div className= {style.container}>

            <div className = {style.profile}>
             <img src={href === '' ? '/camera.png' : href }  className={style.imageContainer} /> 
            <h5 className= {style.username}> `@Username`</h5>
            <a className = {style.description}>  Descrição do usuario</a>

            </div>

            
            <div className ={style.containerRight}>
            
            <h3>Lista de aplicativos</h3>
            <input placeholder='Pesquisar aplicativos'></input>

            <h3> Solicitaões de acionistas</h3>
            
            
            </div>

            <div className ={style.containerLeft}>
            
             <input value='Copiar' type='button'></input> <input disabled></input>
              <br></br><br>
             </br><br></br>
             <br></br>

            <input value='Adicionar' type='button'></input><input placeholder ='Novo projecto' disabled></input>
            
            </div>

            </div>
                     
            </>
      );

}