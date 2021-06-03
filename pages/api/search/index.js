export default (req,res) =>{
    // const { search } = req.body
    //const data =  db.find(search, {})
    const data = {
        name:'Kone',
        description:'something else'
    }

    res.status(200).json(data)
}