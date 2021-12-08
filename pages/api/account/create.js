import formidable from 'formidable';
import  { ConnectToDatabase } from '../../../db/connection';
import fs from 'fs';

export const config = {
    api: {
      bodyParser: false
    }
}

let _idGlobal;

export default async (req,res) => {
    
    const db = await ConnectToDatabase();
    const users = await db.collection('users');
    const httpMethod = req.method;
    
    
    const form = new formidable.IncomingForm({
        maxFieldsSize:Infinity,
        multiples: true, 
    });
    form.keepExtensions = true;
   
    // save image to folder
    
    form.parse(req, async (err, fields, files) => {  
        const data = fs.readFileSync(files.file.filepath);
        fs.writeFileSync(`public/uploads/${files.file.newFilename}`,data); 
        //section database 
         const { fullname, name,phone,province,description,password } = fields;
         if(httpMethod === 'POST'){
 
             const alredyExist = await users.findOne({ phone }, {_id:1});
             if(!!alredyExist){
                 res.send({
                     message:'Este número já está cadastrado', 
                     sugestion: 'Faça login'
                 });
                 return;
             }
             const result = await users.insertOne({
                fullname,
                name,
                phone,
                province,
                description, 
                password,
                avatar:files.file.newFilename,
                feed:[],
                followers:[]
             });
             
            const { _id } = result.ops[0];
            // console.log(_id);
            _idGlobal = _id;
                
         }    
    }); 
    res.send({tokenId:_idGlobal}); 
    
   
}
   
