import {useRouter,Link} from 'next/router'

import Header from '../header'
import Card from './Card'

export default function Apps(){
      
      const [comment, setComment] = useState('')
      
      const makeAComment = () => {
            return(
                  <div className={}>
                        //User name
                        //comment
                        //likes
                  </div>
            );
      }
      
      return(
            <>
                  {/*Header*/}
                  <Header />

                  {/*Feed*/}
                  <section className='feed'>
                        <Card />
                  </section>

                  {/*Meus projectos*/}
            
                  {/*Mais pesquisados/Em alta*/}
            </>
      );
}
