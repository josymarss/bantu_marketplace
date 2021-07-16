import {useState} from 'react'
import {useRouter, Link} from 'next/router'

export default function Contract(){

      return(
            <form action='POST'>
                  <div>
                        <input type='text' className=''/>
                  </div>
                  <div className='reactions'>
                        <button>Acept</button>
                        <button>Decline</button>
                        <button>Adjustment</button>
                  </div>
            </form>
      );
}


//Should have a text generator 

// SSR - server side render, to give all information, fast and precise

const getServerSideProps = () => {
      // get all contracts loaded
}