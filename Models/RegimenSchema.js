const mongoose = require ('mongoose')
const RegimenSchema =require ('./Schemas/RegimenAl-Ej')

module.exports = mongoose.model('regimen',RegimenSchema)