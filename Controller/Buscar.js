const Paciente = require('../Models/PacienteSchema')
class APIfeature{
    constructor(query,queryString){
        this.query=query;
        this.queryString=queryString;
    }
    /* FILTROS */
    filteringEmail(){
        const queryObj={...this.queryString}
        const excludedFields=['page','sort','limit','name']
        excludedFields.forEach(el=>delete(queryObj[el]))
        let queryStr =JSON.stringify(queryObj)
        queryStr=queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g,match=>'$'+match)
        console.log(queryStr)
        /* const test= JSON.parse(queryStr.replace(/}{/g,',')); */
        this.query.find(JSON.parse(queryStr)) 
        return this;
    }
    filteringName(){
        const queryObj={...this.queryString}
        const excludedFields=['page','sort','limit','email']
        excludedFields.forEach(el=>delete(queryObj[el]))
        let queryStr =JSON.stringify(queryObj)
        queryStr=queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g,match=>'$'+match)
        console.log(queryStr)
        this.query.find(JSON.parse(queryStr)) 
        return this;
    }
    /* FIN DE FILTROS */
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
        .filteringEmail().sorting().paginating()
        const paciente = await features.query
            if(paciente.length === 0){

                const features = new APIfeature(Paciente.find().lean(),req.query)
        .filteringName().sorting().paginating()
        const paciente = await features.query
                console.log("No se encontro nada pasa al siguiente datos")
                res.json({
                    status:'Exito en la bsuqueda',
                    result:paciente.length,
                    paciente:paciente
                })
            }else{
                res.json({
                    status:'Exito en la bsuqueda',
                    result:paciente.length,
                    paciente:paciente
                })
            }
  

    }catch(err){
        return res.status(500).json({msg:err.message});
        }
    }
}
module.exports = controller