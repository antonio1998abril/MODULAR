const express = require ('express');
const UserController = require('../Controller/user')
const PacienteController = require('../Controller/paciente')
const auth = require('../Middleware/auth');

const routes = {
    user: express.Router()
    .post('/register',UserController.register)
    .post('/login',UserController.login)
    .get('/logout',UserController.logout)
    .get('/refresh_token',UserController.refreshToken)
    .get('/info',auth,UserController.getUser),

    paciente: express.Router()
    .get('/getpaciente',auth,PacienteController.GetPaciente)
    .post('/createpaciente',auth,PacienteController.NewPaciente)
    .delete('/deletePaciente/:id',PacienteController.DeletePaciente)
    /*Expedienete */
    .post('/createExpediente/:id',auth,PacienteController.CreateExpediente)
    .post('/createRegimen/:id',auth,PacienteController.createRegimen)
    .get('/getExpediente/:id',PacienteController.getExpediente)
    .put('/upExpediente/:id',auth,PacienteController.updateExpediente)
    .post('/NewHistorial/:id',auth,PacienteController.NewHistorial)


}

module.exports = routes