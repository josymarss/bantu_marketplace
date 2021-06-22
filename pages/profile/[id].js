import { Fragment } from 'react'
import { useRouter as router } from 'next/router'

export default function User(){
    const myIdToken = router.params.myIdToken
    retunr(
        <Fragment>
            <p>my token is: { myIdToken }</p>
        </Fragment>
    )
}