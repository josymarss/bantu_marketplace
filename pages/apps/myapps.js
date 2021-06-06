import App from './app'
import styles from './myapps.module.css'

export default function MyApps(){
     return(
          <>
               <App />
          </>
     );
}
// const getServerSideprops = async (context)  =>{
//      // search my _id on local storage
//      //Take the id, go to the database and take may all apps
// }