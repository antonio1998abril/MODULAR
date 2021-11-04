const express=require ('express')
const app = express();
require('dotenv').config()
const cookieParser =require('cookie-parser')
const fileUpload = require('express-fileupload');

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

 
const PORT = process.env.PORT || 5000
app.listen(PORT,()=> console.log("Server Activated Correctly"))


