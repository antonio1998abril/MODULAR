const mongoose =require('mongoose')
const Schema = mongoose.Schema;


const UserExpediente = new Schema({
    InicioEnfermedadMentales: {
        type:String,
        required: false,
        default:''
    },
    Medicamentos:{
        type:String,
        required: false,
        default:''
    },
    Alergias:{
        type:String,
        required: false,
        default:''
    },
    Antecedentes:{
        type:String,
        required: false,
        default:''
    },
    EstatusDental:{
        type:String,
        required: false,
        default:''
    },
    HemoglobinaGlucosilada:{
        type:String,
        required: false,
        default:''
    },
    Microalbuminuria:{
        type:String,
        required: false,
        default:''
    },
    NivelCoresterol:{
        type:String,
        required: false,
        default:''
    },
    NivelTrigliseridos:{
        type:String,
        required: false,
        default:''
    },
    Electrocadriograma:{
        type:String,
        required: false,
        default:''
    },
    Cuerpodaño:{
        type:String,
        required: false,
        default:''
    },
    OtrasEnfermedades:{
        type:String,
        required: false,
        default:''
    },
    FactorRiesgo: {
        type:String,
        required: false,
        default:''
    },
    EstadoMental: {
        type:String,
        required: false,
        default:''
    },
    StatusViejoExpediente: {
        type:Boolean,
        required: false,
        default:false
    },
    Lunes:{
        type:String,
        required: false
    },
    Martes:{
        type:String,
        required: false
    },
    Miercoles:{
        type:String,
        required: false
    },
    Jueves:{
        type:String,
        required: false
    },
    Viernes:{
        type:String,
        required: false
    },
    Sabado:{
        type:String,
        required: false
    },
    Domingo:{
        type:String,
        required: false
    },
    Ejercicio:{
        type:String,
        required: false
    },
    Comida:{
        type:String,
        required: false
    },
    paciente_id:{
        type:Schema.Types.ObjectId,
        ref:'paciente'
    }
},{
    timestamps: true
  })

module.exports = UserExpediente


//// DEJAR AL USUARIO PONER SUS VALORES NORMALES DE GLUCOSA REGIMEN ALIMENTICIO, RECORDATORIO
// DE CADA VALOR DEFAULT
//SEPARAR MODELOS: PREVENTIVOS(LABORATORIO, SENTIR DEL PACIENTE), ANTECENDENTE, PROBLEMAS MENTALES, PROBLMEAS FISICOS