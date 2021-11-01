import React from 'react'
import {Line} from 'react-chartjs-2';

const Evolucion= ({info})=> {
 let ListGlucosaG = Object.values(info.ListGlucosa)

 
const data = {
  labels:[1,2,4,65,7,4],
  datasets: [
    {
      label: 'My First dataset',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data:[ ListGlucosaG ]
    }
  ]
};

 
    return (
        <>
        <div className="col-sm-6 d-none d-sm-block">
            <ol className="breadcrumb float-sm-left">
              <li className="breadcrumb-item active"><h5>EVOLUCION DEL PACIENTE:</h5></li>
            </ol>
          </div>
        
          <div>
    <h2>Line Example</h2>
    <Line
      data={data}
      width={400}
      height={400}
    />
  </div>

          

        </>
    )
}

export default Evolucion

export const getServerSideProps = async ({query}) => { 
    const res = await fetch(`http://localhost:5000/api/graph/${query.evolucion}`)
    const info = await res.json()
    const result =  JSON.stringify(info)
    if (!info) {
      return {
        notFound: true,
      }
    } 
     return {
      props: {info,result},
    } 
  } 