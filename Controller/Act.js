const Act = require ("../Models/ActividadesSchema");

const controller = {
    getAct : async  (req, res, next) => {
        console.log("URL",req.params.id)
        await Act.find({paciente_id:req.params.id}).then(activities => {
            res.json({
                activities:activities
            })
        }).catch(next)
    },
    postAct : async(req,res,next) => {
        const {TimeToComplete,Activityname,Content,DateToComplete, paciente_id} = req.body;
        
        if(!TimeToComplete || !Activityname || !Content || !DateToComplete || !paciente_id) return res.status(302).json({msg:"Completa todos los campos."})

        let ToComplete = new Date(DateToComplete)
        const newActivitiy = new Act({
            Activityname:Activityname,
            Content: Content,
            DateToComplete:DateToComplete,
            TimeToComplete:TimeToComplete,
            paciente_id:paciente_id
        })
        
        await newActivitiy.save().then(()=> {
            return res.json({msg:"Nueva Actividad Agregada"})
        }).catch(next)
    },
    updateAct: async(req,res,next) => {
        
    },
    deleteAct: async (req,res,next) => {
        await Act.findByIdAndRemove({_id:req.params.id}).then(()=>{
            res.json({msg:"Actividad Elminada"})
        }).catch(next) 
    }
}

module.exports = controller

