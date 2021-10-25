const Paciente = require("../Models/PacienteSchema")
const Glucosa = require("../Models/GlucosaSchema")

const controller = {
    getGraphs : async  (req, res, next) => {
        const GlucosaData = await Glucosa.find({paciente_id:req.params.id})
        await Paciente.findById({_id:req.params.id}).lean().populate('allExpedientes').then(result => {
            console.log(result.allExpedientes.length)
            console.log(GlucosaData)
          
            /*  const doneact = [];
            const pending = [];
            for (i = 0; i < activities.length; i++){
                if(activities[i].Status === true){
                    doneact.push(activities[i])
                } else {
                pending.push(activities[i])
                } 
            }  */

            res.json(result)
        }).catch(next)
    }
    
}

module.exports = controller

