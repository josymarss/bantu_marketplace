import { ConnectToDatabase } from '../../../db/connection';
import { ObjectId } from 'mongodb';

export default async (req,res) => {
    const db = await ConnectToDatabase();
    const apps = await db.collection('apps');
    const users = await db.collection('users');

    const { myId } = req.body;
    const { id } = req.query;
    const method = req.method;
    //De todos os usuarios buscar seus feed e actualizar app stars
    const resultApps = await users.findOne({feed: {app:{_id:new ObjectId(id) }}}); 
    console.log(resultApps);

    switch(method){
    //retorna specific app
    //edit app name or other 
    //delete app 
    //onother things here
        case 'PUT':
            const app = await apps.findOne({_id :new ObjectId(id)});
            const { userId, stars } = app;
        
            if(myId != userId){
                // Dar star em um aplicativo 
                const isThere = stars.usersid.filter(userid => userid == myId);
                if(isThere.length == 0){
                    const apptoUpdate = await apps.findOne({_id: new ObjectId(id)});
                    apptoUpdate.stars.usersid.push(myId);
                    apptoUpdate.stars.likes = apptoUpdate.stars.likes +1;
                    await apps.updateOne({_id:new ObjectId(id)},{$set:apptoUpdate});
                }else{
                    // Remover o star
                    const apptoUpdate = await apps.findOne({_id: new ObjectId(id)});
                    if(apptoUpdate.stars.likes != 0){
                        const usersid = apptoUpdate.stars.usersid.filter(id => id != myId);
                        apptoUpdate.stars.likes -=1; 
                        await apps.updateOne(
                            {_id:new ObjectId(id)},
                            {$set:
                                {stars:{
                                    usersid,
                                    likes:apptoUpdate.stars.likes
                                }
                        }});
                    }

                    
            }
        break;
            }
    }
    const appResulting = await apps.findOne({_id:new ObjectId(id)});
    const finalLike = appResulting.stars.likes;
    res.send(finalLike);
}