import React from 'react'
import './styles/Paginado.css'
//ESTE COMPONENTE RENDERIZA LOS NUMEROS, para ir pasando.
function Paginado({recipesPerPage, allRecipes, paginado}) {
    const pageNumbers = [];
    //math.ceil devuelve un numero redondo.
    for(let i = 1; i <= Math.ceil(allRecipes/recipesPerPage); i++){
        pageNumbers.push(i)
        //pageNumbers, es un arreglo con los numeros de paginas totales.
    }
    return (
    <nav> 
        <ul className='paginado'>
        {pageNumbers && 
        pageNumbers.map((n,i) => {
           return (
            <li  key = {i} className='numero'>
            <a href={i} onClick={() => paginado(n)}>{n}</a>
            </li>
            )
        })}
        </ul>
    </nav>
  )
}

export default Paginado