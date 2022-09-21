import React from 'react'
import {Link} from 'react-router-dom'
import './styles/LandingPage.css'
import cooking from './styles/imagenes/cooking.png'

function LandingPage() {
  return (
    <div className='container-landing'>
      <div className='titulo'>
      <h1>Bienvenidos</h1>
      </div>
      <div className='cont-cooking'>
        <img src={cooking} className='cooking' alt='' />
      </div>
      <div className='cont-button'>
        <Link to='/home'>
        <button className='button-start'>
          HOME
        </button>
        </Link>
        </div>
        <footer className='footer'>
          PÁGINA HECHA POR SANTIAGO CABALLERO.
        </footer>
    </div>
  )
}

export default LandingPage