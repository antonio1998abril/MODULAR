import React from 'react'

const Evolucion= ({data})=> {
console.log(data)
 
    return (
        <>
        <div className="col-sm-6 d-none d-sm-block">
            <ol className="breadcrumb float-sm-left">
              <li className="breadcrumb-item active"><h5>EVOLUCION DEL PACIENTE:</h5></li>
            </ol>
          </div>


        </>
    )
}

export default Evolucion

export const getServerSideProps = async ({query}) => { 
    const res = await fetch(`http://localhost:5000/api/graph/${query.evolucion}`)
    const data = await res.json()
    const result =  JSON.stringify(data)
    if (!data) {
      return {
        notFound: true,
      }
    } 
     return {
      props: {data,result},
    } 
  } 