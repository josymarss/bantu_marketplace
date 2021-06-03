//Structure of database
const data = {
     user:{
          avatar:'/favicon.ico',
          name:'josymar',
          bio:'I do some stuff',
          myApps:[
               {
                    payment:0,
                    id:1,
                    name:'Kone',
                    description:'A popular game in kilamba centrality',
                    icon:'/favicon.ico',
                    requests:[{
                         user:{//Have some id, automaticly from mongodb
                              id:1,
                              name:'josymar',
                              aboutUser:'Programmer'
                         },
                         description:' I do it it and more stuff!',
                         image:'/favicon.ico',
                         status:'' //em curso, sucesso, falhada
                    }]
               }
          ],// for each app should have negociations
          followers:[{// Should be, an user object with the same informations
               id:1,//should have an id
               name:'rniochy',
               aboutUser:'Stuff 1, and more'
          },
          {
               id:2,
               name:'ferrazzo',
               aboutUser:'Stuff 1, and more'
          }],
          myfeedposts:[{
               id_post:1,
               message:'fulano enviou uma solicitacao no aplicativo X'
          }],
          ligations:[
               App    
          ],
          appstoacept:[App],
          aceptedapps:[App]
     },
     
} 
// Structure of classes 
/*negociations:{
     state:['acept', 'on going', 'rejected']
     initialDate: '',//Date()
     finished:false,

}

Apps:{
     name:'',
     description:'',
     icon:{},
     requests:[]      
}*/
export default data 