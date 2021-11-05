const express=require ('express')
const app = express();
require('dotenv').config()
const cookieParser =require('cookie-parser')
const fileUpload = require('express-fileupload');
/* end all */

const Notification = require('./Models/NotificacionesSchema')
const Activities = require('./Models/ActividadesSchema');
const nodemailer=require('nodemailer')
const moment = require('moment');
/* end all */
//my routes
const Routes = require('./Routes/routes')
const uploadRoute=require('./Routes/uploads')
//Connect to data base
const mongoose = require('mongoose');
mongoose.set('runValidators', true);
mongoose.connect(process.env.DB, {
  useNewUrlParser : true, 
  useUnifiedTopology : true,
  useFindAndModify : false,
  useCreateIndex: true
}).then(response => console.log("MongoDB Connected Successfully.") )
.catch(err => console.log("Database connection failed.") );
mongoose.connection;
//get data from inputs of my frontend
app.use(express.json());
 
//get body entries
app.use(express.urlencoded({
    extended: true
  }));

  app.use(fileUpload({
    useTempFiles:true
  }))

//used to on jsonwebtoken cookie
 app.use(cookieParser()) 

app.use('/api',Routes.user)
app.use('/api',Routes.paciente)
app.use('/api',uploadRoute)

app.use(function(err,req,res,next){
    res.json({error:err.message}) 
 })

 app.get('/', function (req, res) {
  res.send('backend subido')
})


/* BOORRAR */

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MESSAGEEMAIL,
    pass: process.env.PASSEMAIL
  }
});

tick()/* CADA MINUTO */
Ftomorrow()/* CADA DIA */

function Ftomorrow(){
  var hours =new Date().getHours();
  var minutes=new Date().getMinutes();
  let timeDay=hours+':'+minutes
/*   if(timeDay >= "11:00"  && timeDay <= "23:59"){ */
        getremindD(timeDay)  
  /* } */
}

function tick(){
    var hours =new Date().getHours();
    var minutes=new Date().getMinutes();
    let time=hours+':'+minutes
   /*  if(time >= "23:00"  && time <= "2:59"){ */
         getremind(time) 
   /*  }    */
}

var toExactMinute = 60000 - (new Date().getTime() % 60000);


setInterval(tick,50000);//cada minuto
setInterval(Ftomorrow,86400000)//cada 24 horas

///CADA MINUTO
function getremind(time){

  
    const CreateNotification= async ({State,Medics}) =>{
    for (i=0;i < Medics.length; i++){
        let notifications = new Notification({
        title:`Muy pronto la actividad ${State.Activityname} para ${State.name} ${State.lastname}  `,
        Content: `Debera de completarse antes del  ${State.DateToComplete} a las ${State.TimeToComplete}`,
        user_id:Medics[i],
        }) 
        notifications.save().then(()=> {
          console.log("new Notification")
      }) 
      } 
  }
    const getAct = async()=> {
        let ListReminder = await Activities.find({Status:false}).lean().populate('paciente_id')
        ListReminder = JSON.stringify(ListReminder) 
        ListReminder = JSON.parse(ListReminder)

        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth()).padStart(2, '0'); 
        let yyyy = today.getFullYear();
        /* FECHA DE HOY */
        today =  yyyy + '-' + mm + '-' + dd; 
        let tomorrowDay = moment(today, "YYYY.MM.DD");

        let tomorrowDayA2 = moment(new Date()).toDate();
        let m =tomorrowDayA2.getMonth() +1
        tomorrowDayA2 = tomorrowDayA2.getFullYear()  + '-' + m + '-' + tomorrowDayA2.getDay().toString().padStart(2, '0'); 

        let sTime2 = moment(new Date()).toDate();
        sTime2 = sTime2.getHours().toString().padStart(2, '0')+':'+ sTime2.getMinutes().toString().padStart(2, '0');


        tomorrowDay =tomorrowDay.add(1, 'days').toDate().getDate();
        /* let cca = moment(today).add(2, 'months') console.log(cca.toDate().getMonth()) */
        let tomorrow = new Date();
        let tomorrowMonth =  moment(new Date()).add(1, 'M').toDate();
        /* FECHA DE MAÑANA */
        tomorrow =  tomorrowMonth.getFullYear() + '-' + tomorrowMonth.getMonth() + '-' + tomorrowDay ;
        /* HORA MAS QUINCE MINUTOS */
        let Remember15 = moment(new Date()).add(15, 'm').toDate();
        Remember15 = Remember15.getHours().toString().padStart(2, '0') +':'+Remember15.getMinutes().toString().padStart(2, '0');
        //ListReminder  = util.inspect(ListReminder, false, null) dos horas
        let Remember2 = moment(new Date()).add(2,'h').toDate();
        Remember2 = Remember2.getHours().toString().padStart(2, '0') +':'+Remember2.getMinutes().toString().padStart(2, '0');
            if (ListReminder.length >= 0){
             for (i =0 ; i< ListReminder.length; i++ ) {
                let info = ListReminder[i].paciente_id
                let Medics = ListReminder[i].paciente_id.MedicoDeCabecera
                
               
                const State =  new Object({
                    name: info.name,
                    lastname:info.lastname,
                    email:info.email,
                    Activityname:ListReminder[i].Activityname,
                    DateToComplete:ListReminder[i].DateToComplete,
                    TimeToComplete:ListReminder[i].TimeToComplete
                })
                /* comparar fecha del  usuario con la variable tomorrow */
                /*  console.log(sTime2,ListReminder[i].TimeToComplete)
                console.log(ListReminder[i].DateToComplete,tomorrowDayA2)  */

                if(ListReminder[i].DateToComplete == today && ListReminder[i].TimeToComplete ==  Remember2  || ListReminder[i].TimeToComplete == Remember15  || ListReminder[i].DateToComplete == tomorrowDayA2 && sTime2 == ListReminder[i].TimeToComplete){
              

                  CreateNotification({State,Medics})
                    let mailOptions = {
                    from: process.env.MESSAGEEMAIL,
                    to: info.email,
                    subject: `La actividad ${State.Activityname} vence pronto!!! `,
                    text: `La actividad ${State.Activityname} asignada a ${State.name} ${State.lastname} debera completarse pronto antes del ${State.DateToComplete} a las ${State.TimeToComplete}` ,
                }; 
                 transporter.sendMail(mailOptions, function(error, info){ 
                    if (error) { console.log(error); } else {console.log('Email sent: ' + info.response); }
                });   
                                     
                  }               
            }
          
            console.log("**********************************")
            console.log("Tiempo 15 MINUTOS ANTES: ",Remember15)
            console.log("Tiempo comparar dos horas despues pero de la hora de la cita: ",Remember2)
            console.log("Fecha un dia despues",tomorrow)
            console.log("**********************************")
        }
    }

    getAct()
}


/* CADA DIA */
function getremindD(time){


  const CreateNotification= async ({State,Medics}) =>{
  for (i=0;i < Medics.length; i++){
      let notifications = new Notification({
      title:`Muy pronto la actividad ${State.Activityname} para ${State.name} ${State.lastname}  `,
      Content: `Debera de completarse antes del  ${State.DateToComplete} a las ${State.TimeToComplete}`,
      user_id:Medics[i],
      }) 
      notifications.save().then(()=> {
        console.log("new Notification")
    }) 
    }
}

  const getActD = async()=> {
      let ListReminder = await Activities.find({Status:false}).lean().populate('paciente_id')
      ListReminder = JSON.stringify(ListReminder) 
      ListReminder = JSON.parse(ListReminder)
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth()).padStart(2, '0'); 
      let yyyy = today.getFullYear();
      /* FECHA DE HOY */
      today =  yyyy + '-' + mm + '-' + dd; 
      let tomorrowDay = moment(today, "YYYY.MM.DD");
      tomorrowDay =tomorrowDay.add(1, 'days').toDate().getDate();
      let tomorrow = new Date();
      let tomorrowMonth =  moment(new Date()).add(1, 'M').toDate();
      /* FECHA DE MAÑANA */
      tomorrow =  tomorrowMonth.getFullYear() + '-' + tomorrowMonth.getMonth() + '-' + tomorrowDay ;
          if (ListReminder.length >= 0){
           for (i =0 ; i< ListReminder.length; i++ ) {
              let info = ListReminder[i].paciente_id
              let Medics = ListReminder[i].paciente_id.MedicoDeCabecera
              const State =  new Object({
                  name: info.name,
                  lastname:info.lastname,
                  email:info.email,
                  Activityname:ListReminder[i].Activityname,
                  DateToComplete:ListReminder[i].DateToComplete,
                  TimeToComplete:ListReminder[i].TimeToComplete
              })
              /* comparar fecha del  usuario con la variable tomorrow */
              if(ListReminder[i].DateToComplete == tomorrow){
                CreateNotification({State,Medics})
                  let mailOptions = {
                  from: process.env.MESSAGEEMAIL,
                  to: info.email,
                  subject: `La actividad ${State.Activityname} vence pronto!!! `,
                  text: `La actividad ${State.Activityname} asignada a ${State.name} ${State.lastname} debera completarse pronto antes del ${State.DateToComplete} a las ${State.TimeToComplete}` ,
              }; 
               transporter.sendMail(mailOptions, function(error, info){ 
                  if (error) { console.log(error); } else {console.log('Email sent: ' + info.response); }
              });   
                  console.log("MENSAJE ENVIADO PARA MAÑANA")                    
                }               
          }
      }
  }

  getActD()
}

/* BORRAR */
 
const PORT = process.env.PORT || 5000
app.listen(PORT,()=> console.log("Server Activated Correctly"))


