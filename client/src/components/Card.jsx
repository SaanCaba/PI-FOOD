import React from 'react'
import { Link } from 'react-router-dom'
import './styles/Card.css'
import {useDispatch} from 'react-redux'
import {deleteRecipe} from '../actions/index.js'


function Card({title, image, diet, id, healthScore}) {

  const dispatch = useDispatch()

  const handleClick = (e) =>{
    e.preventDefault()
    dispatch(deleteRecipe(id))
  }
  return (
    // aca renderizo solamente lo que piden.
    //title, tipo de dieta, y una imagen.
    <div className='card'>
        <button onClick={(e) => handleClick(e)} className='btn-dlt'>x</button>
      <header className='header'>
        <h3 >Name: {title}</h3>
        </header>
        <h5 className='dieta'>Dieta: {diet}</h5>
        <div className='div-img'>
        <img className='img' src={image} alt='image dont found' width="300px" height="350px" />
        <br />
        {healthScore > 50 ? <label className='healthScore-green'>💚 %{healthScore}</label>
        :<label className='healthScore-red'>⚠️ %{healthScore}</label>}
        </div>
        <Link to={`/recipe/${id}`} className='link'>
          <label className='details'>Details</label>
          </Link>
    </div>
  )
}

export default Card