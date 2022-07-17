import React, { useEffect } from 'react';
const Launchapps = ({apps}) => {

    useEffect(()=> {
        console.log(apps)
    }, [])

    return (
        <div>
            <h1>Hello!!!</h1>
        </div>
    );
}

export default Launchapps;
