import React from 'react'
import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { findRecipe } from '../actions/index'
import { getRecipes } from '../actions/index'
import './styles/SearchBar.css'

function SearchBar() {
    const[recipe, setRecipe] = useState('')
    const[errors, setErrors] = useState({
        vacio:'',
        msg:''
    })
    
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getRecipes())
    },[dispatch])
    const handleChange = (e) => {
        e.preventDefault()
        setErrors({
            vacio:''
        })
        setRecipe(e.target.value)
        dispatch(findRecipe(e.target.value))
    }
    //manejador del submit(boton de busqueda)
    const handleSubmit = (e) => {
        e.preventDefault()
    if(recipe === ''){
      return setErrors({
            vacio : 'El buscador está vacío'
        })
    }
    dispatch(findRecipe(recipe.toLowerCase()))
   setErrors({
    vacio:'',
    })
    }
  return (
    <form className='input-search'>
        <input className='input' name= 'search' type='text' placeholder='Find Recipe...' onChange={(e)=> handleChange(e)}></input>
        <button className='button'  onClick={(e)=> handleSubmit(e)}>Search</button>
        <br />
        {errors.vacio?(
            <label className='error'>{errors.vacio}</label>
        ): ''}
        {errors.msg?(
            <label className='error'>{errors.msg}</label>
        ) : ''}
    </form>
  )
}

export default SearchBar