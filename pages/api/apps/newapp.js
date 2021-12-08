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
        });
        res.send({resul:'Sucess'})
}   