const Paciente = require('../Models/PacienteSchema')
class APIfeature{
    constructor(query,queryString){
        this.query=query;
        this.queryString=queryString;
    }
    filtering(){
        const queryObj={...this.queryString}
        const excludedFields=['page','sort','limit']
        excludedFields.forEach(el=>delete(queryObj[el]))

        let queryStr =JSON.stringify(queryObj)
        queryStr=queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g,match=>'$'+match)

        this.query.find(JSON.parse(queryStr))
        return this;
    }
    sorting(){
        if(this.queryString.sort){
            const sortBy=this.queryString.sort.split(',').join(' ')
            this.query=this.query.sort(sortBy)
        }else{
            this.query=this.query.sort('-createdAt')
        }
        return this;
    }
    paginating(){
        const page=this.queryString.page *1||1
        const limit=this.queryString.limit * 1||5
        const skip =(page -1)*limit;
        this.query=this.query.skip(skip).limit(limit)
        return this;
    }
}
const controller = {
    findPaciente :async(req,res) => {
        try{
        const features = new APIfeature(Paciente.find().lean(),req.query)
        .filtering().sorting().paginating()
        const paciente = await features.query
        res.json({
            status:'Exito en la bsuqueda',
            result:paciente.length,
            paciente:paciente
        })
    }catch(err){
        return res.status(500).json({msg:err.message});
        }
    }
}
module.exports = controller