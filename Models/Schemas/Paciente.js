const mongoose =require('mongoose')
const Schema = mongoose.Schema;


const PacienteSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    lastname: {
        type:String,
        required: true
    },
    tel:{
        type:String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    peso:{
        type:String,
        required: true
    },
    sexo:{
        type:String,
        required: true
    },
    edad:{
        type:String,
        required: true
    },
    diabetesTipo:{
        type:String,
        required: true
    },
    presion:{
        type:String,
        required: true
    },
    IncioEnfermedad: {
        type:String,
        required: true
    },
    Citas:[{
        type:Schema.Types.ObjectId,
        ref:'citas'
      }],
    allRegimen:[{
        type:Schema.Types.ObjectId,
        ref:'regimen'
      }],
    Activities:[{
        type:Schema.Types.ObjectId,
        ref:'actividades'
      }],
    allExpedientes:[{
        type:Schema.Types.ObjectId,
        ref:'expediente'
      }], 
    Expediente:{
        type:Object,
        required:false
    },
    Regimen:{
        type:Object,
        required:false
    },
    Encargado_id:{
        type:Schema.Types.ObjectId,
        ref:'user'
    }
})

module.exports = PacienteSchema

///crear tabla de expediente, y historica, 
//sistemas de alarmas, compartir expediente, buscador implemnetar