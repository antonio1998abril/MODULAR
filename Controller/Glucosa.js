const Glucosa = require ("../Models/GlucosaSchema");

const controller = {
    getGlucosaList : async  (req, res, next) => {
        await Glucosa.find({Paciente_id:req.user.ud}).select().then(pacientes => {
            res.json(pacientes)
        }).catch(next)
    }
}

module.exports = controller