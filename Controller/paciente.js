const Paciente = require ("../Models/PacienteSchema")
const User = require ("../Models/UserSchema")
const Expediente = require ("../Models/ExpedienteSchema")
const Regimen = require ("../Models/RegimenSchema")

const controller = {
    GetPaciente: async (req ,res ,next) => {
        await Paciente.find({Encargado_id:req.user.id}).then(pacientes => {
            res.json(pacientes)
           }).catch(next)
    },
    NewPaciente: async (req,res,next)=>{
        const {name,lastname,tel,email,peso,sexo,edad, diabetesTipo,presion,IncioEnfermedad} = req.body
        const existeEmail = await Paciente.findOne({email})
        const existeTel= await Paciente.findOne({tel})
        
        if (existeEmail || existeTel) return res.status(302).json({msg:"Este Usuario ya esta Registrado, con Email o Telefono iguales, Buscalo en la seccion."})
        
        if (!name || !lastname  || !tel  || !email || !peso || !sexo || !edad || !diabetesTipo  || !presion  || !IncioEnfermedad) return res.status(302).json({msg:"Completa todos los campos."})

        const newPaciente = new Paciente({
            name, lastname, tel, peso, sexo, edad, diabetesTipo, presion,email, IncioEnfermedad ,Encargado_id:req.user.id,Expediente:{
                InicioEnfermedadMentales:'', Medicamentos:'', Alergias:'', Antecedentes:'',EstatusDental:'',GlucosaSangre:'',
            HemoglobinaGlucosilada:'', Microalbuminuria:'',  NivelCoresterol:'',
            NivelTrigliseridos:'', Electrocadriograma:'',Cuerpodaño:'',dialisis:'',OtrasEnfermedades:'',
            FactorRiesgo:'',EstadoMental:''
            }, Regimen:{Lunes:'', Martes:'', Miercoles:'',Jueves:'',Viernes:'',Sabado:'',Domingo:'',Ejercicio:'',Comida:''}
        })

        await newPaciente.save().then(()=>{
            console.log(newPaciente)
            res.json({msg:"Nuevo paciente"})
        }).catch(next) 
    
    },
    DeletePaciente: async (req,res,next) => {
        await Paciente.findByIdAndDelete(req.params.id).then(() =>{
            res.json({msg:"Eliminado"})
        }).catch(next) 
    
    },
    /* DATOS DEL ECXPEDIETN ASI ARRIAB */

    /* GET ALL INFORMATION */
    getExpediente : async (req,res,next)=> {
        const infoPaciente = await Paciente.find({_id:req.params.id}).lean()
        if (!infoPaciente)  return res.status(302).json({msg:"No Existe este paciente."})
        await Paciente.find({_id:req.params.id}).lean().populate([{path:'allExpedientes',model:'expediente'},{path:'allRegimen',model:'regimen'}]).then(result => {
            res.json(result)
           }).catch(next) 
    },
    NewHistorial : async(req,res,next) => {
        console.log(req.body)
        const dataExpediente = await Paciente.findById({_id:req.params.id})
        const newExpediente = new Expediente ({
            InicioEnfermedadMentales:req.body.InicioEnfermedadMentales,
            Medicamentos:req.body.Medicamentos,
            Alergias :req.body.Alergias,
            Antecedentes: req.body.Antecedentes ,
            EstatusDental:req.body.EstatusDental ,
            GlucosaSangre: req.body.GlucosaSangre ,
            HemoglobinaGlucosilada: req.body.HemoglobinaGlucosilada,
            Microalbuminuria: req.body.Microalbuminuria,
            NivelCoresterol: req.body.NivelCoresterol,
            NivelTrigliseridos: req.body.NivelTrigliseridos,
            Electrocadriograma: req.body.Electrocadriograma,
            Cuerpodaño:req.body.Cuerpodaño,
            dialisis: req.body.dialisis,
            OtrasEnfermedades:req.body.OtrasEnfermedades,
            FactorRiesgo: req.body.FactorRiesgo,
            EstadoMental: req.body.EstadoMental, 
            StatusViejoExpediente:true,

            //INFORMACION DEL REGIMEN ALIMENTICIO
            Lunes: req.body. Lunes,
            Martes: req.body.Martes,
            Miercoles: req.body.Miercoles,
            Jueves: req.body.Jueve,
            Viernes: req.body.Viernes,
            Sabado: req.body.Sabado,
            Domingo: req.body.Domingo,
            Ejercicio: req.body.Ejercicio,
            Comida: req.body.Comida
       }) 
       dataExpediente.allExpedientes.push(newExpediente)
       dataExpediente.save().then(async()=>{
            newExpediente.save(); 
            await Paciente.findByIdAndUpdate({_id:req.params.id},{
                Expediente: {
                InicioEnfermedadMentales:'', Medicamentos:'', Alergias:'', Antecedentes:'',EstatusDental:'',GlucosaSangre:'',
                HemoglobinaGlucosilada:'', Microalbuminuria:'',  NivelCoresterol:'',
                NivelTrigliseridos:'', Electrocadriograma:'',Cuerpodaño:'',dialisis:'',OtrasEnfermedades:'',
                FactorRiesgo:'',EstadoMental:''
                    }, 
                Regimen:    {
                    Lunes:'', Martes:'', Miercoles:'',Jueves:'',Viernes:'',Sabado:'',Domingo:'',Ejercicio:'',Comida:''
                }
            })
            return res.json("Expediente se Guardo correctamente en en Historial")
       })

    },

    /* CREATE REGIMEN */
    createRegimen: async(req, res, next) => {
        const {Lunes,Martes,Miercoles,Jueves,Viernes,Sabado,Domingo,Ejercicio,Comida} = req.body;
            const newRegimen  = new Regimen ({
                Lunes,Martes,Miercoles,Jueves,Viernes,Sabado,Domingo,Ejercicio,Comida,paciente_id:req.params.id
            });
            await Paciente.findByIdAndUpdate({_id:req.params.id},{
                Regimen:newRegimen
            }).catch(next)
            return res.json({msg:"Regimen Creado Exitosamente"})

            
    },    
     updateRegimen: async (req,res, next) => {
        await Regimen.findByIdAndUpdate({paciente_id:req.params.id},{Lunes,Martes,Miercoles,Jueves,Viernes,Sabado,Domingo,Ejercicio,Comida}).then(()=>{
            res.json({msg:"Regimen Actualizado Actualizado"})
        }).catch(next) 
        }, 

    /* Actaual EXPEDIENTE */
    CreateExpediente: async(req, res ,next) => {
        const { InicioEnfermedadMentales, Medicamentos, Alergias, Antecedentes,EstatusDental,GlucosaSangre,
            HemoglobinaGlucosilada, Microalbuminuria,  NivelCoresterol,
            NivelTrigliseridos, Electrocadriograma,Cuerpodaño,dialisis,OtrasEnfermedades,
            FactorRiesgo,EstadoMental} = req.body;

            const newExpediente  = new Expediente ({
                Medicamentos, Alergias,Antecedentes,InicioEnfermedadMentales,
                GlucosaSangre,EstatusDental,HemoglobinaGlucosilada, Microalbuminuria,  NivelCoresterol,
                NivelTrigliseridos, Electrocadriograma,Cuerpodaño,dialisis,OtrasEnfermedades,
                FactorRiesgo,EstadoMental,paciente_id:req.params.id
            });
            await Paciente.findByIdAndUpdate({_id:req.params.id},{
                Expediente:newExpediente
            }).catch(next)
            return res.json({msg:"Expediente Creado Exitosamente"})
    },
     updateExpediente: async (req,res, next) => {
  /*       await Expediente.findByIdAndUpdate({paciente_id:req.params.id},{EstadoSalud, NivelAzucar, IncioEnfermedad,GlucosaSangre,
            HemoglobinaGlucosilada, Microalbuminuria, NivelCoresterol,
            NivelTrigliseridos, Electrocadriograma,Cuerpodaño,dialisis,OtrasEnfermedades,
            FactorRiesgo,EstadoMental}).then(()=>{
            res.json({msg:"Expediente Actualizado"})
        }).catch(next)  */
    } 

    
    
    
    }
module.exports = controller

