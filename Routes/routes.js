const express = require ('express');
const UserController = require('../Controller/user')
const PacienteController = require('../Controller/paciente')
const auth = require('../Middleware/auth');
const BuscarController = require('../Controller/Buscar');
const GlucosaController = require('../Controller/Glucosa');

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
    .delete('/deletePaciente/:id',PacienteController.DeletePaciente)
    /*Expedienete */
    .post('/createExpediente/:id',auth,PacienteController.CreateExpediente)
    .post('/createRegimen/:id',auth,PacienteController.createRegimen)
    .get('/getExpediente/:id',PacienteController.getExpediente)
    .post('/NewHistorial/:id',auth,PacienteController.NewHistorial)
    .delete('/DeleteHistorial/:id',PacienteController.DeleteExpediente)
    .post('/addCopy',auth,PacienteController.addCopy)

    /* GLUCOSA */
    .post('/postGlucosa',auth,GlucosaController.postGlucosa)
    .get('/getGlucosa',auth,GlucosaController.getGlucosaList)
}

module.exports = routes