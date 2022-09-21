import React from 'react'
import Animation from './gifs/zanahoria-mrf.gif';
import './styles/Loader.css'

function Loader() {
  return (
          <div className='contenedor-loader'>
            <img  className='loader' src={Animation} alt='' />
            <br/>
            <span className='loading'>Loading...</span>
            </div>
  )
}

export default Loader