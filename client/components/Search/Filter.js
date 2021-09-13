import React,{useContext} from 'react'
import { GlobalState } from '../GlobalState'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch} from '@fortawesome/free-solid-svg-icons'

function Filter() {
    const state = useContext(GlobalState)
    const [sort,setSort] = state.Paciente.sort
    const [search, setSearch] = state.Paciente.search
    
    return (
<>
    <div className="filter_menu">
      {/*   <div className="container-fluid"> */}
           {/*  <h2 className="text-center display-4">Buscar</h2> */}
{/*             <div className="row"> */}
               {/*  <div className="col-md-8 offset-md-2">
                    <form>
                        <div className="input-group"> */}
                            <input value= {search} onChange={e=>setSearch(e.target.value.toLowerCase())}type="search" className="form-control form-control-lg" placeholder="Escribe..."/>
{/*                             <div className="input-group-append">
                                <button type="submit" className=" btn-lg btn-search">
                                 <FontAwesomeIcon icon={faSearch}  className="searchC" transform="shrink-3"  /> 
                                </button>
                            </div> */}
                                <div className="row sort">
                                    <span>Buscar por: </span>
                                    <select value={sort} onChange={e=>setSort(e.target.value)}> 
                                        <option value=''>Pacientes recien registrados</option>
                                        <option value='sort=oldest'>Pacientes agregados mas anitiguos </option>
                                        <option value='sort=-edad'>Mayores de 18 años</option>
                                        <option value='sorrt=-edad'>Menores de 18 años</option>
                                    </select>
                                </div>
                            
                        </div>
                        <br/>

{/* 
                    </form>
                </div>
            </div> */}
{/*         </div> */}
  {/*   </div>  */}   
</>
    )
}

export default Filter
