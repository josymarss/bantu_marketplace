//Structure of database
data = {
     profile:{
          avatar:'/favicon.ico',
          name:'josymar',
          bio:'I do some stuff',
          myApps:[
               {
                    name:'Kone',
                    description:'A popular game in kilamba centrality',
                    icon:'/favicon.ico',
                    requests:[{
                         user:{//Have some id, automaticly from mongodb
                              name:'josymar',
                              aboutUser:'Programmer'
                         },
                         description:' I do it it and more stuff!'
                    }]
               }
          ],// for each app should have negociations
          followers:[{//should have an id
               name:'rniochy',
               aboutUser:'Stuff 1, and more'
          },
          {
               name:'ferrazzo',
               aboutUser:'Stuff 1, and more'
          }]
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
