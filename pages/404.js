import { useEffect } from "react";
import router, { useRouter } from 'next/router'

const NotFound = () => {
        useEffect(()=>{
            const backToLogIn = ()=> {
                    window.sessionStorage.clear()
                 return router.push('/account/login')
            }
            backToLogIn() 
        })
    return (<div></div>);
}
export default NotFound;
