import { ObjectId } from 'mongodb';
import fs from 'fs';
import formidable from 'formidable';
import {ConnectToDatabase} from '../../../db/connection';

export const config = {
    api: {
      bodyParser: false
    }
}

export default async (req,res) => {
    const method = req.method;
     //Database section 
     const db = await ConnectToDatabase();
     const apps = await db.collection('apps');
    //Formdable section
    const form = new formidable.IncomingForm({
        maxFieldsSize:Infinity,
        multiples: true, 
    });
    form.keepExtensions = true;
    
    form.parse(req, async (err, fields, files) => { 
        
        const data = fs.readFileSync(files.file.filepath);
        fs.writeFileSync(`public/appfiles/${files.file.newFilename}`,data); 
        if(method ==='POST'){
            const { name, description,link, myId } = fields;

        const appResult = await apps.insertOne(
            {   
                userId:myId, 
                name,
                description,
                avatar:files.file.newFilename, 
                link,
                stars:{
                    usersid:[],
                    likes:0
                },
                negociations:[] 
            }
        );
            res.send(appResult.ops[0]);
        }
        if(method ==='PUT'){
            const {name,description,link,percent,idapp} = fields;
            const updatedApp = await apps.findOne({_id:ObjectId(idapp)});
            updatedApp.name = name;
            updatedApp.description = description;
            updatedApp.link = link;
            updatedApp.avatar = files.file.newFilename;
            
            
            await apps.updateOne({_id:ObjectId(idapp)},{
                $set:{
                    _id:updatedApp._id,
                    userId:updatedApp.userId,
                    name:updatedApp.name,
                    description:updatedApp.description,
                    avatar:updatedApp.avatar,
                    link:updatedApp.link,
                    stars:updatedApp.stars,
                    negociations:updatedApp.negociations,
                    percent:percent
                }
            });
            res.send({success:'success!'});
        }
        if(method ==='DELETE'){

        }
        
        });
        res.send({resul:'Sucess'})
}   