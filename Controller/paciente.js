const Paciente = require ("../Models/PacienteSchema")
const User = require ("../Models/UserSchema")
const Expediente = require ("../Models/ExpedienteSchema")
/* Encargado_id:req.user.id */
const Notifications = require ("../Models/NotificacionesSchema")

const controller = {
    GetPaciente: async (req ,res ,next) => {
        await Paciente.find({$or:[{ Encargado_id:req.user.id},{MedicoDeCabecera:req.user.id}]}).lean().then(paciente => {
                res.json(paciente)
           }).catch(next)
    },
    NewPaciente: async (req,res,next)=>{
        const {name,lastname,tel,email,peso,sexo,edad, diabetesTipo,IncioEnfermedad,images, altura} = req.body
        const existeEmail = await Paciente.findOne({email})
        const existeTel= await Paciente.findOne({tel})
        
        if (existeEmail || existeTel) return res.status(302).json({msg:"Este Usuario ya esta Registrado, con Email o Telefono iguales, Buscalo en la seccion."})
        
        if (!name || !lastname  || !tel  || !email || !peso || !sexo || !edad || !diabetesTipo  || !IncioEnfermedad || !images || !altura) return res.status(302).json({msg:"Completa todos los campos."})

        const newPaciente = new Paciente({
            name, lastname, tel, peso, sexo, edad, diabetesTipo, email, altura,images,IncioEnfermedad ,Encargado_id:req.user.id,Expediente:{
                InicioEnfermedadMentales:'', Medicamentos:'', Alergias:'', Antecedentes:'',EstatusDental:'',GlucosaSangre:'',
            HemoglobinaGlucosilada:'', Microalbuminuria:'',  NivelCoresterol:'',
            NivelTrigliseridos:'', Electrocadriograma:'',Cuerpodaño:'',dialisis:'',OtrasEnfermedades:'',presion:'',
            FactorRiesgo:'',EstadoMental:''
            }, Regimen:{Lunes:'', Martes:'', Miercoles:'',Jueves:'',Viernes:'',Sabado:'',Domingo:'',Ejercicio:'',Comida:''}
        })
        newPaciente.MedicoDeCabecera.push(req.user.id)
        await newPaciente.save().then(()=>{
            res.json({msg:"Nuevo paciente"})
        }).catch(next) 
    
    },
    DeletePaciente: async (req,res,next) => {      
        const patient = await Paciente.findById(req.params.id).select('Encargado_id');
        
        if(patient.Encargado_id == req.user.id) {
            await Paciente.findByIdAndDelete(req.params.id).then(() =>{
                res.json({msg:"Eliminado"})
            }).catch(next)
        }else {
            Paciente.findByIdAndUpdate(
                {_id: req.params.id},
                { $pull:{MedicoDeCabecera:req.user.id}})
           .then(() =>{
               res.json({msg:"Eliminado"})
           }).catch(next)
        }
    },
    UpdatePaciente : async (req,res,next) => {
        const {name,lastname,tel,email,peso,sexo,edad, diabetesTipo,IncioEnfermedad,images, altura} = req.body;
       
        const existeEmail = await Paciente.findOne({email},{_id:req.body._id})
        const existeTel= await Paciente.findOne({tel},{_id:req.body._id})
        
        
        
        /* if (!existeEmail || !existeTel ) return res.status(302).json({msg:"Este Usuario ya esta Registrado, con Email o Telefono iguales, Buscalo en la seccion."}) */
        
        
        if (!name || !lastname  || !tel  || !email || !peso || !sexo || !edad || !diabetesTipo  || !IncioEnfermedad || !images || !altura) return res.status(302).json({msg:"Completa todos los campos."})
        await Paciente.findByIdAndUpdate({_id:req.params.id},{
            name,lastname,tel,email,peso,sexo,edad, diabetesTipo,IncioEnfermedad,images, altura
        }).then(() => {
            res.json({msg:`usuario ${name} actualizado`})
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
        const dataExpediente = await Paciente.findById({_id:req.params.id})

        const newExpediente = new Expediente ({
            InicioEnfermedadMentales:req.body.InicioEnfermedadMentales,
            Medicamentos:req.body.Medicamentos,
            Alergias :req.body.Alergias,
            Antecedentes: req.body.Antecedentes ,
            EstatusDental:req.body.EstatusDental ,
            HemoglobinaGlucosilada: req.body.HemoglobinaGlucosilada,
            Microalbuminuria: req.body.Microalbuminuria,
            NivelCoresterol: req.body.NivelCoresterol,
            NivelTrigliseridos: req.body.NivelTrigliseridos,
            Electrocadriograma: req.body.Electrocadriograma,
            Cuerpodaño:req.body.Cuerpodaño,
            
            OtrasEnfermedades:req.body.OtrasEnfermedades,
            FactorRiesgo: req.body.FactorRiesgo,
            EstadoMental: req.body.EstadoMental, 
            
            StatusViejoExpediente:true,

            //INFORMACION DEL REGIMEN ALIMENTICIO
            Lunes: req.body.Lunes,
            Martes: req.body.Martes,
            Miercoles: req.body.Miercoles,
            Jueves: req.body.Jueves,
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
                InicioEnfermedadMentales:'', Medicamentos:'', Alergias:'', Antecedentes:'',EstatusDental:'',
                HemoglobinaGlucosilada:'', Microalbuminuria:'',  NivelCoresterol:'',
                NivelTrigliseridos:'', Electrocadriograma:'',Cuerpodaño:'',OtrasEnfermedades:'',
                FactorRiesgo:'',EstadoMental:''}, 
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
            const newRegimen  = {
                Lunes,Martes,Miercoles,Jueves,Viernes,Sabado,Domingo,Ejercicio,Comida,paciente_id:req.params.id
            };
            await Paciente.findByIdAndUpdate({_id:req.params.id},{
                Regimen:newRegimen
            }).catch(next)
            return res.json({msg:"Regimen Creado Exitosamente"})

            
    },    


    /* Actaual EXPEDIENTE */
    CreateExpediente: async(req, res ,next) => {
        const { InicioEnfermedadMentales, Medicamentos, Alergias, Antecedentes,EstatusDental,GlucosaSangre,
            HemoglobinaGlucosilada, Microalbuminuria,  NivelCoresterol,
            NivelTrigliseridos, Electrocadriograma,Cuerpodaño,dialisis,OtrasEnfermedades,
            FactorRiesgo,EstadoMental,presion} = req.body;

            const newExpediente  = new Expediente ({
                Medicamentos, Alergias,Antecedentes,InicioEnfermedadMentales,
                EstatusDental,HemoglobinaGlucosilada, Microalbuminuria,  NivelCoresterol,
                NivelTrigliseridos, Electrocadriograma,Cuerpodaño,OtrasEnfermedades,
                FactorRiesgo,EstadoMental,paciente_id:req.params.id
            });
            await Paciente.findByIdAndUpdate({_id:req.params.id},{
                Expediente:newExpediente
            }).catch(next)
            return res.json({msg:"Expediente Creado Exitosamente"})
    },
     DeleteExpediente: async (req,res, next) => {
        await Expediente.findByIdAndRemove({_id:req.params.id}).then(()=>{
            res.json({msg:"Expediente Elminado"})
        }).catch(next)  
    } ,
/* Agregar Expediente */
    addCopy: async (req,res,next) => {
        const {pacienteAdd} = req.body
        const alreadyCopy = await Paciente.find({Encargado_id:req.user.id,_id:pacienteAdd})
        const paciente = await Paciente.findById({_id:pacienteAdd})
        const alreadyMedic = await Paciente.find({_id:pacienteAdd,MedicoDeCabecera:req.user.id})
        if(alreadyCopy.length === 0 && alreadyMedic.length === 0) {
                paciente.MedicoDeCabecera.push(req.user.id)
                paciente.save()
                res.json({msg:"Paciente Agregado Exitosamente"})
        }else {
            return res.status(302).json({msg:"Este Paciente ya ha sido Agregado"}) 
        }
    },
/* Agergar expediente */
    /* Notification */
    getNotificacion :async (req,res,next) => {
        const allNotification = await Notifications.find({user_id:req.user.id}).lean()
        res.json({
            data:allNotification,
            sizeNoti: allNotification.length
        })  

        }, 
        deleteNotifications :async(req,res,next) => {
            await Notifications.findByIdAndRemove({_id:req.params.id}).then(()=>{
                res.json({msg:"Notificacion Elminado"})
            }).catch(next)  
        }
    
    }
module.exports = controller

