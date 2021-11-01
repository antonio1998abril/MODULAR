const Paciente = require("../Models/PacienteSchema")
const Glucosa = require("../Models/GlucosaSchema")
const moment = require('moment')
const controller = {
    getGraphs : async  (req, res, next) => {
        const GlucosaData = await Glucosa.find({paciente_id:req.params.id})
        const allData = await Paciente.findById({_id:req.params.id}).lean().populate('allExpedientes')
        const listHemoglobinaGlucosilada = []
        const ListMicroalbuminuria = []

        const ListNivelCoresterol = []
        const ListNivelTrigliseridos = []
        const ListEstadoMental = []
        const ListOtrasEnfermedades = []
        const ListElectrocadriograma = []

        const LisGlucosa = []
        const ListPresion = []
        const ListDialisis = []
        let obj =JSON.parse(JSON.stringify(allData.allExpedientes));
       

        for (i=0; i< allData.allExpedientes.length; i++){          
            for (i in obj){
                console.log(obj[i].NivelCoresterol)
                let getDate = new Date(obj[i].updatedAt);
                let RealDate = moment(getDate,'YYYY-MM-DD').add(1,'M').format("YYYY-MM-DD, hh:mm A");
                listHemoglobinaGlucosilada.push({date:RealDate,value: obj[i].HemoglobinaGlucosilada}) 
                ListMicroalbuminuria.push({date:RealDate,value: obj[i].Microalbuminuria})

                ListNivelCoresterol.push({date:RealDate,value: obj[i].NivelCoresterol})
                ListNivelTrigliseridos .push({date:RealDate,value: obj[i].NivelTrigliseridos })
                ListEstadoMental.push({date:RealDate,value: obj[i].EstadoMental})
                ListOtrasEnfermedades.push({date:RealDate,value: obj[i].OtrasEnfermedades})
                ListElectrocadriograma.push({date:RealDate,value: obj[i].Electrocadriograma})
             }
        }
 
      
  
      /*       await Paciente.findById({_id:req.params.id}).lean().populate('allExpedientes').then(result => {
                let obj = JSON.stringify(result.allExpedientes)
                    obj = JSON.parse(result.allExpedientes)
console.log(GlucosaData.allExpedientes.length)
                const HemoglobinaGlucosilada = [];
                        for (i = 0; i < result.allExpedientes.length; i++) {
                let Hemo= result.allExpedientes.HemoglobinaGlucosilada[i]
                } 
                console.log(obj)
            console.log("infoGlucosa",GlucosaData)
                res.json(result)
            }).catch(next) */


          res.json({
            ListMicroalbuminuria:ListMicroalbuminuria, 
            ListNivelCoresterol:ListNivelCoresterol, 
            ListNivelTrigliseridos:ListNivelTrigliseridos,
            ListEstadoMental:ListEstadoMental, 
            ListOtrasEnfermedades:ListOtrasEnfermedades,
            ListElectrocadriograma:ListElectrocadriograma,
          })
    }
    
}

module.exports = controller

