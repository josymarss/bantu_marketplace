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
            const { name, description,link, myId,categoria,percentMax,percentMin } = fields;
            const date = new Date();
            const dia = date.getDate();
            const mes = date.getMonth()+1; 
            const ano = date.getFullYear();

        const appResult = await apps.insertOne(
            {   
                userId:myId, 
                name,
                description,
                avatar:files.file.newFilename, 
                link,
                categoria,
                stars:{
                    usersid:[],
                    likes:0
                },
                percentMax,
                percentMin,
                data: dia+'/'+mes+'/'+ano
            }
        );
            res.send(appResult.ops[0]);
        }
        if(method ==='PUT'){
            const {name,description,link,percent,idapp,categoria} = fields;
            const updatedApp = await apps.findOne({_id:ObjectId(idapp)});
            updatedApp.name = name;
            updatedApp.description = description;
            updatedApp.link = link;
            updatedApp.avatar = files.file.newFilename;
            updatedApp.categoria = categoria;
            updatedApp.percent = percent;
            
            
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
                    percent:updatedApp.percent,
                    categoria: updatedApp.categoria
                }
            });
            res.send({success:'success!'});
        }
       
       

        });
        
        res.send({resul:'Sucess'})
}   