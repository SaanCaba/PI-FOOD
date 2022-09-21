import React from 'react'
import { getRecipeDetail } from '../actions'
import {useDispatch, useSelector} from 'react-redux'
import {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { clearRecipeDetail } from '../actions'
import './styles/CardDetail.css'
import Loader from './Loader'

function CardDetail({match}) {
    let id = match.params.id
    const dispatch = useDispatch()
    const recipeDetail = useSelector(state => state.recipeDetail)

    useEffect(()=>{
        dispatch(getRecipeDetail(id))
    },[dispatch, id])
    
    useEffect(()=>{
        return () =>{
         return  dispatch(clearRecipeDetail())
        }
    },[dispatch]) // este useEffect, es para cuando se desmonte la página.
  return (
    <div className='container'>
        <Link to="/home">
        <button className='btn-home'>Home</button>
        </Link>
        {recipeDetail.length>0? recipeDetail?.map(e => {
            return(
                <div key = {e.id} className='cont-details'>
                    <h3 className='title-detail'>{e.title}</h3>
                    <img className='img-detail' src={e.image} alt='img dont found' />
                    <h5 className='dieta-detail'>Diets: {e.diets.map(e => e.name +', ').join('')}</h5>
                    <section className='summary'>
                        <h2>Summary: </h2>
                    <p className='summary-detail'>{e.summary.replace(/<[^>]*>?/g, "")}</p> {/*con el replace, saco las etiquetas html */}
                    </section>
                    {e.healthScore > 50 ? <span className='healthscore-detail-green'>Health Score: {e.healthScore}</span>
                    :<span className='healthscore-detail-red'>Health Score: {e.healthScore}</span>}
                   <br/>
                   <span className='dishtype'>Dish Type: {Array.isArray(e.dishTypes) ? e.dishTypes.map(e => e.name + ', ').join('') : e.dishType}</span>
                   <br />
                   <section className='steps-detail'>
                    <h2>Steps: </h2>
                   { e.steps ? <p>{e.steps}</p>: <p>Esta receta no tiene steps</p>}
                   </section>
                   </div>
            )
        }) : <Loader />      }
        </div>
  )
}

export default CardDetail