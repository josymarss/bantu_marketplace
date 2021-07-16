

export default function App({ apps}){
     return (
          apps.map(app => {
               <div className='app-container' Key={app.name}>
                    <p>{app.icon}</p>
                    <p>{app.name}</p>
                    <p>{app.description?'':'description'}</p>
               </div>
          })
     );
}

