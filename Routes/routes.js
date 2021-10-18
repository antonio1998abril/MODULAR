const express = require ('express');
const UserController = require('../Controller/user')
const PacienteController = require('../Controller/paciente')
const auth = require('../Middleware/auth');
const BuscarController = require('../Controller/Buscar');
const GlucosaController = require('../Controller/Glucosa');
const ActController = require('../Controller/Act');

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

    
}

tick()

function tick(){
    var hours =new Date().getHours();
    var minutes=new Date().getMinutes();
    var seconds=new Date().getSeconds();
    const time=hours+':'+minutes+':'+seconds
    if(time >= "22:20:0"  && time <= "22:24:00"){
        getremind()
    }
   
}
setInterval(tick,1000);


function getremind(){
    console.log("recordar")
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