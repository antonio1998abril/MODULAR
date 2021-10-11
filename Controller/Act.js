const Act = require ("../Models/ActividadesSchema");

const controller = {
    getAct : async  (req, res, next) => {
        await Act.find({Paciente_id:req.params.id}).lean().then(activities => {
            res.json(activities)
        }).catch(next)
    },
    postAct : async(req,res,next) => {
        const {Activityname,Content,DateToComplete, paciente_id} = req.body;
        
        if(!Activityname || !Content || !DateToComplete || !paciente_id) return res.status(302).json({msg:"Completa todos los campos."})

        let ToComplete = new Date(DateToComplete)
        const newActivitiy = new Act({
            Activityname:Activityname,
            Content: Content,
            DateToComplete:ToComplete,
            paciente_id:paciente_id
        })
        
        await newActivitiy.save().then(()=> {
            return res.json({msg:"Nueva Actividad Agregada"})
        }).catch(next)
    },
    updateAct: async(req,res,next) => {
        
    },
    deleteAct: async (req,res,next) => {
        
    }
}

module.exports = controller

/* const ActivitySchema = new Schema({
    Activityname:{
        type: String,
        required: true
    },
    Content: {
        type:String,
        required: true
    },
    DateToComplete:{
        type:Date,
        required: true
    },
    Status: {
        default:false,
        type:Boolean,
        required: true
    },
    paciente_id:{
        type:Schema.Types.ObjectId,
        ref:'paciente'
    }},
    {
    timestamps: true
  })

module.exports = ActivitySchema */