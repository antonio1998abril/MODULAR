const Glucosa = require ("../Models/GlucosaSchema");

const controller = {
    getAct : async  (req, res, next) => {
        await Glucosa.find({Paciente_id:req.user.ud}).select().then(pacientes => {
            res.json(pacientes)
        }).catch(next)
    },
    postAct : async(req,res,next) => {
        const newGlucosa = new Glucosa({
            Glucosa:req.body.Glucosa,
            paciente_id :req.body. PacienteId
        })
        await newGlucosa.save().then(()=> {
            return res.json({msg:"Nuevo Valor Agregado"})
        }).catch(next)
    },
    updateAct: async(req,res,next) => {
        
    },
    deleteAct: async (req,res,next) => {
        
    }
}

module.exports = controller