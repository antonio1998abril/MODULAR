const express = require ('express');
const UserController = require('../Controller/user')
const PacienteController = require('../Controller/paciente')
const auth = require('../Middleware/auth');
const BuscarController = require('../Controller/Buscar');
const GlucosaController = require('../Controller/Glucosa');
const ActController = require('../Controller/Act');
const Activities = require('../Models/ActividadesSchema');
const nodemailer=require('nodemailer')
const Paciente = require('../Models/PacienteSchema')
const util = require('util');


const routes = {
    user: express.Router()
    .post('/register',UserController.register)
    .post('/login',UserController.login)
    .get('/logout',UserController.logout)
    .get('/refresh_token',UserController.refreshToken)
    .get('/info',auth,UserController.getUser),

    paciente: express.Router()
    .get('/findPaciente',BuscarController.findPaciente)
    .get('/getpaciente',auth,PacienteController.GetPaciente)
    .post('/createpaciente',auth,PacienteController.NewPaciente)
    .delete('/deletePaciente/:id',auth,PacienteController.DeletePaciente)
    /*Expedienete */
    .post('/createExpediente/:id',auth,PacienteController.CreateExpediente)
    .post('/createRegimen/:id',auth,PacienteController.createRegimen)
    .get('/getExpediente/:id',PacienteController.getExpediente)
    .post('/NewHistorial/:id',auth,PacienteController.NewHistorial)
    .delete('/DeleteHistorial/:id',PacienteController.DeleteExpediente)
    .post('/addCopy',auth,PacienteController.addCopy)

    /* GLUCOSA */
    .post('/postGlucosa',auth,GlucosaController.postGlucosa)
    .get('/getGlucosa/:id',auth,GlucosaController.getGlucosaList)

    /* ACTIVIDADES */
    .post('/postACT',auth,ActController.postAct)
    .get('/getAct/:id',auth,ActController.getAct)
    .delete('/deleteAct/:id',ActController.deleteAct)
    .put('/upAct/:id',auth,ActController.updateAct)
    .put('/doneAct/:id',ActController.DoneAct)
    .put('/backOff/:id',ActController.Backoff)

    
}

tick()

function tick(){
    var hours =new Date().getHours();
    var minutes=new Date().getMinutes();
    var seconds=new Date().getSeconds();
    const time=hours+':'+minutes+':'+seconds
    if(time >= "10:00:0"  && time <= "19:00:00"){
        getremind()
    }
   
}
setInterval(tick,100000);


function getremind(){
    const getAct = async()=> {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.MESSAGEEMAIL,
              pass: process.env.PASSEMAIL
            }
          });
          let ListReminder = await Activities.find({Status:false}).lean().populate('paciente_id')
          ListReminder = JSON.stringify(ListReminder) 
          ListReminder = JSON.parse(ListReminder)
          //ListReminder  = util.inspect(ListReminder, false, null)
          // ListReminder = JSON.stringify(ListReminder) 
          //ListReminder = JSON.parse(ListReminder)
        /*   console.log(ListReminder[0])  */

             //agarrar la fecha actual y de la busqueda de los usuarios agregarle dos dias y si conincide con la fecha actual pumm enviar
           /*    let g =ListReminder[0].paciente_id
              console.log(g.name)
              console.log(ListReminder[0].Activityname) */
            if (ListReminder.length >= 0){
             for (i =0 ; i< ListReminder.length; i++ ) {
                 
                let info =ListReminder[i].paciente_id
                const State =  new Object({
                    name: info.name,
                    lastname:info.lastname,
                    email:info.email,
                    Activityname:ListReminder[i].Activityname,
                    DateToComplete:ListReminder[i].DateToComplete,
                    TimeToComplete:ListReminder[i].TimeToComplete
                })
                

             console.log("Mensaje enviado")
/*                  let mailOptions = {
                    from: process.env.MESSAGEEMAIL,
                    to: info.email,
                    subject: `La actividad ${State.Activityname} vence pronto!!! `,
                    text: `La actividad ${State.Activityname} asignada a ${State.name} ${State.lastname} debera completarse pronto antes del ${State.DateToComplete} a las ${State.TimeToComplete}` ,
                }; 
                 transporter.sendMail(mailOptions, function(error, info){ 
                    if (error) { console.log(error); } else {console.log('Email sent: ' + info.response); }
                });  */
    
              
            }        
        }
    }

    getAct()

/*     dbconn.query('SELECT * FROM activity',async function (err,result){
        var gettime=JSON.stringify(result);
        var alltime=JSON.parse(gettime)
        const objeto =alltime.map(a=>a.remind)
        
        const today=new Date();
        const yesterday= new Date(today)
        yesterday.setDate(yesterday.getDate()-1)

     
        var formatdate=yesterday.toISOString().slice(0,10)
        console.log(formatdate,"fecha actual")
        const listate=[];  
   
        for(i in objeto){
                const setact=new Date(objeto[i])
                setact.setDate(setact.getDate())
                var covertdate=setact.toISOString().slice(0,10)
                if(covertdate==formatdate) {
                listate.push(covertdate)
                    }
                }
                if (listate.length==0){
                    console.log("vacio")
                }else{
                    console.log("Lista a recordar",listate)
                    givemessage(listate) 
                    givewhatsapp(listate)
                }     
}) */

}

module.exports = routes