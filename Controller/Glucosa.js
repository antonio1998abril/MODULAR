const Glucosa = require ("../Models/GlucosaSchema");

const controller = {
    getGlucosaList : async  (req, res, next) => {
        await Glucosa.find({paciente_id:req.params.id}).lean().then(pacientes => {
            res.json(pacientes)
        }).catch(next)
    },
    postGlucosa : async(req,res,next) => {
        const newGlucosa = new Glucosa({
            Glucosa:req.body.Glucosa,
            paciente_id:req.body.PacienteId
        })
        await newGlucosa.save().then(async ()=> {
            return res.json({msg:"Nuevo Valor Agregado"})
        }).catch(next)
    },
    updateGlucosa: async(req,res,next) => {
        
    },
    deleteGlucosa: async (req,res,next) => {
        
    }
}

module.exports = controller

