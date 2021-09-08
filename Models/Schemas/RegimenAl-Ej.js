const mongoose =require('mongoose')
const Schema = mongoose.Schema;


const RegimenExpediente = new Schema({
    Lunes:{
        type:String,
        required: true
    },
    Martes:{
        type:String,
        required: true
    },
    Miercoles:{
        type:String,
        required: true
    },
    Jueves:{
        type:String,
        required: true
    },
    Viernes:{
        type:String,
        required: true
    },
    Sabado:{
        type:String,
        required: true
    },
    Domingo:{
        type:String,
        required: true
    },
    Ejercicio:{
        type:String,
        required: true
    },
    Comida:{
        type:String,
        required: true
    },
    paciente_id:{
        type:Schema.Types.ObjectId,
        ref:'paciente'
    }
},{
    timestamps: true
  })

module.exports = RegimenExpediente

