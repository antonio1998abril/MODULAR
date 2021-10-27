module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/register',
        destination: 'http://localhost:5000/api/register'
      },{
        source: '/api/refresh_token',
        destination: 'http://localhost:5000/api/refresh_token'
      },{
        source: '/api/login',
        destination: 'http://localhost:5000/api/login'
      },{
        source: '/api/logout',
        destination: 'http://localhost:5000/api/logout'
      },{
        source: '/api/info',
        destination: 'http://localhost:5000/api/info'
      },
      ///PACIENTES
      {
        source: '/api/getpaciente',
        destination: 'http://localhost:5000/api/getpaciente'
      },
      {
        source: '/api/createpaciente',
        destination: 'http://localhost:5000/api/createpaciente'
      },
      {
        source: '/api/deletePaciente/:id',
        destination: 'http://localhost:5000/api/deletePaciente/:id'
      },//EXPEDIENTE
      {
        source: '/api/createExpediente/:id',
        destination: 'http://localhost:5000/api/createExpediente/:id'
      },
      {
        source: '/api/createRegimen/:id',
        destination: 'http://localhost:5000/api/createRegimen/:id'
      },
      {
        source: '/api/getExpediente/:id',
        destination: 'http://localhost:5000/api/getExpediente/:id'
      },
/*       {
        source: '/api/upExpediente/:id',
        destination: 'http://localhost:5000/api/upExpediente/:id'
      }, */
      {
        source:'/api/NewHistorial/:id',
        destination:'http://localhost:5000/api/NewHistorial/:id'
      },{
        source:'/api/DeleteHistorial/:id',
        destination:'http://localhost:5000/api/DeleteHistorial/:id'
      },
      /* Search for  patients*/
      {
        source: '/api/findPaciente',
        destination: 'http://localhost:5000/api/findPaciente'
      },
      /* Copy Expediente  */
      {
        source: '/api/addCopy',
        destination: 'http://localhost:5000/api/addCopy'
      }, 

      /* GLUCOSA PRESION DIALISIS */
      {
        source: '/api/postGlucosa',
        destination: 'http://localhost:5000/api/postGlucosa'
      },{
        source:'/api/getGlucosa/:id',
        destination: 'http://localhost:5000/api/getGlucosa/:id'
      },{
        source:'/api/upGlucosa/:id',
        destination: 'http://localhost:5000/api/upGlucosa/:id'
      },{
        source:'/api/deleteGlucosa/:id',
        destination: 'http://localhost:5000/api/deleteGlucosa/:id'
      },
      /* GLUCOSA PRESION DIALISIS */
      /* ACTIVIDADES */
      {
        source: '/api/postACT',
        destination: 'http://localhost:5000/api/postACT'
      },
      {
        source: '/api/getAct/:id',
        destination: 'http://localhost:5000/api/getAct/:id'
      },{
        source: '/api/deleteAct/:id',
        destination: 'http://localhost:5000/api/deleteAct/:id'
      },{
        source:'/api/upAct/:id',
        destination: 'http://localhost:5000/api/upAct/:id'
      },{
        source:'/api/doneAct/:id',
        destination: 'http://localhost:5000/api/doneAct/:id'
      },{
        source:'/api/backOff/:id',
        destination: 'http://localhost:5000/api/backOff/:id'
      },
      /* GRAPSH */
      {
        source:'/api/graph/:id',
        destination: 'http://localhost:5000/api/graph/:id'
      }
    ]
  }
}