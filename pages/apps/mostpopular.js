import App from './app'
import styles from './mostpopular.module.css'

export default function MostPopular(){
     return(
          <>
               <App />
          </>
     );
}

const getServerSideprops = (context) =>{
     //search on database apps have more negociations
     //from heigheir to lower 
    // returs a props with a lis of this apps
}