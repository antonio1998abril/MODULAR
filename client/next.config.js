module.exports = {
  reactStrictMode: true, 
  images: {
    domains: ['res.cloudinary.com'],
  },
  
  async rewrites() {
    return [

      {
        source: '/api/register',
        destination: 'https://backdiabetins.herokuapp.com/api/register'
      },{
        source: '/api/refresh_token',
        destination: 'https://backdiabetins.herokuapp.com/api/refresh_token'
      },{
        source: '/api/login',
        destination: 'https://backdiabetins.herokuapp.com/api/login'
      },{
        source: '/api/logout',
        destination: 'https://backdiabetins.herokuapp.com/api/logout'
      },{
        source: '/api/info',
        destination: 'https://backdiabetins.herokuapp.com/api/info'
      },
      ///PACIENTES
            /* IMAGES */
      {
        source:'/api/destroy',
        destination:'https://backdiabetins.herokuapp.com/api/destroy'
      },{
        source:'/api/upload',
        destination:'https://backdiabetins.herokuapp.com/api/upload'
      },
      {
        source:'/api/putPaciente/:id',
        destination:'https://backdiabetins.herokuapp.com/api/putPaciente/:id'
      },
      {
        source: '/api/getpaciente',
        destination: 'https://backdiabetins.herokuapp.com/api/getpaciente'
      },
      {
        source: '/api/createpaciente',
        destination: 'https://backdiabetins.herokuapp.com/api/createpaciente'
      },
      {
        source: '/api/deletePaciente/:id',
        destination: 'https://backdiabetins.herokuapp.com/api/deletePaciente/:id'
      },//EXPEDIENTE
      {
        source: '/api/createExpediente/:id',
        destination: 'https://backdiabetins.herokuapp.com/api/createExpediente/:id'
      },
      {
        source: '/api/createRegimen/:id',
        destination: 'https://backdiabetins.herokuapp.com/api/createRegimen/:id'
      },
      {
        source: '/api/getExpediente/:id',
        destination: ' http://localhost:5000/api/getExpediente/:id'
      },
/*       {
        source: '/api/upExpediente/:id',
        destination: 'https://backdiabetins.herokuapp.com/api/upExpediente/:id'
      }, */
      {
        source:'/api/NewHistorial/:id',
        destination:'https://backdiabetins.herokuapp.com/api/NewHistorial/:id'
      },{
        source:'/api/DeleteHistorial/:id',
        destination:'https://backdiabetins.herokuapp.com/api/DeleteHistorial/:id'
      },
      /* Search for  patients*/
      {
        source: '/api/findPaciente',
        destination: 'https://backdiabetins.herokuapp.com/api/findPaciente'
      },
      /* Copy Expediente  */
      {
        source: '/api/addCopy',
        destination: 'https://backdiabetins.herokuapp.com/api/addCopy'
      }, 

      /* GLUCOSA PRESION DIALISIS */
      {
        source: '/api/postGlucosa',
        destination: 'https://backdiabetins.herokuapp.com/api/postGlucosa'
      },{
        source:'/api/getGlucosa/:id',
        destination: 'https://backdiabetins.herokuapp.com/api/getGlucosa/:id'
      },{
        source:'/api/upGlucosa/:id',
        destination: 'https://backdiabetins.herokuapp.com/api/upGlucosa/:id'
      },{
        source:'/api/deleteGlucosa/:id',
        destination: 'https://backdiabetins.herokuapp.com/api/deleteGlucosa/:id'
      },{
        source:'/api/postPresion',
        destination: 'https://backdiabetins.herokuapp.com/api/postPresion'
      },{
        source:'/api/getPresion/:id',
        destination: 'https://backdiabetins.herokuapp.com/api/getPresion/:id'
      },{
        source:'/api/upPresion/:id',
        destination: 'https://backdiabetins.herokuapp.com/api/upPresion/:id'
      },{
        source:'/api/deletePresion/:id',
        destination: 'https://backdiabetins.herokuapp.com/api/deletePresion/:id'
      },/*  */
      {
        source:'/api/postDia',
        destination: 'https://backdiabetins.herokuapp.com/api/postDia'
      },{
        source:'/api/getDia/:id',
        destination: 'https://backdiabetins.herokuapp.com/api/getDia/:id'
      },{
        source:'/api/upDia/:id',
        destination: 'https://backdiabetins.herokuapp.com/api/upDia/:id'
      },{
        source:'/api/deleteDia/:id',
        destination: 'https://backdiabetins.herokuapp.com/api/deleteDia/:id'
      },
      /* GLUCOSA PRESION DIALISIS */
      /* ACTIVIDADES */
      {
        source: '/api/postACT',
        destination: 'https://backdiabetins.herokuapp.com/api/postACT'
      },
      {
        source: '/api/getAct/:id',
        destination: 'https://backdiabetins.herokuapp.com/api/getAct/:id'
      },{
        source: '/api/deleteAct/:id',
        destination: 'https://backdiabetins.herokuapp.com/api/deleteAct/:id'
      },{
        source:'/api/upAct/:id',
        destination: 'https://backdiabetins.herokuapp.com/api/upAct/:id'
      },{
        source:'/api/doneAct/:id',
        destination: 'https://backdiabetins.herokuapp.com/api/doneAct/:id'
      },{
        source:'/api/backOff/:id',
        destination: 'https://backdiabetins.herokuapp.com/api/backOff/:id'
      },
      /* GRAPSH */
      {
        source:'/api/graph/:id',
        destination: 'https://backdiabetins.herokuapp.com/api/graph/:id'
      },
      /* ADMIN TOOLS */
      {
        source:'/api/SuperGet',
        destination: 'https://backdiabetins.herokuapp.com/api/SuperGet'
      },
      /* NOTIFICATION */
      {
        /* /GetNotification */
        source:'/api/GetNotification',
        destination: 'https://backdiabetins.herokuapp.com/api/GetNotification'
      },
      {
        /* /GetNotification */
        source:'/api/deNotification/:id',
        destination: 'https://backdiabetins.herokuapp.com/api/deNotification/:id'
      }

    ]
  }
}