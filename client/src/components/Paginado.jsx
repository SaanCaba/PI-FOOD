import React from 'react'
import { Link } from 'react-router-dom';
import './styles/Paginado.css'
//ESTE COMPONENTE RENDERIZA LOS NUMEROS, para ir pasando.

let number = 1;
function Paginado({recipesPerPage, allRecipes, paginado}) {
    let pageNumbers = [];
    //math.ceil devuelve un numero redondo.
    for(let i = 1; i <= Math.ceil(allRecipes/recipesPerPage); i++){
        pageNumbers.push(i)
        //pageNumbers, es un arreglo con los numeros de paginas totales.
    }
    const prevHandler = (e) => {
        e.preventDefault()
        if(number === pageNumbers[0]) return;
        number--
        let prevPage = number
        return paginado(prevPage)
    }
    // a paginado se le pasa el valor de la pagina actual
    const nextHandler = (e) => {
        e.preventDefault()
        if(number === pageNumbers.length) return;
        number++
        let nextPage = number
      return paginado(nextPage)
    }
    return (
    <nav> 
        <ul className='paginado'>
        <span><button className='btn-prev' onClick={(e)=> prevHandler(e)}>{`<`}</button></span>
        {pageNumbers && 
        pageNumbers.map((n,i) => {
           return (
            <li  key = {i} className='numero'>
                <Link to={`/home/${n}`} onClick={() => paginado(n)}>{n}</Link>
            </li>
            )
        })}
            {/* <span className='img-flechaNext' onClick={(e)=> nextHandler(e)}> <img className='img-flechaNext' src={flechaPrev}/></span> */}
            <span><button  className='btn-next' onClick={(e)=> nextHandler(e)}> {`>`} </button></span>
        </ul>
    </nav>
  )
}

export default Paginado