export default (req,res) =>{
    
    //const data =  db.find({})
    //if(req.method.POST){ const data = re.body}
    // searhc it on database
    const data = {
        name:'Kone',
        description:'something else'
    }

    res.status(200).json(data)
}