import React from 'react'
import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { findRecipe } from '../actions/index'
import { getRecipes } from '../actions/index'
import './styles/SearchBar.css'

function SearchBar() {
    const findRecipes = useSelector(state => state.recipes)
    const[recipe, setRecipe] = useState('')
    const[errors, setErrors] = useState({
        vacio:'',
        msg:''
    })

    const dispatch = useDispatch()
    // const recipes = useSelector(state => state.recipes)

    //manejador del input (input de busqueda)
    const handleChange = (e) => {
        e.preventDefault()
        setErrors({
            vacio:'',
            msg:''
        })
        setRecipe(e.target.value)
    }
    useEffect(()=>{
        dispatch(getRecipes())
    },[dispatch])
    //manejador del submit(boton de busqueda)


    const handleSubmit = (e) => {
        e.preventDefault()
    dispatch(findRecipe(recipe.toLowerCase()))
    if(recipe === ''){
      return  setErrors({
            vacio : 'El buscador está vacío'
        })
    }
    if(findRecipes.length === 0){
        console.log(findRecipes)
      return setErrors({
        msg:'no se encontró nada con ese nombre'
       })
    }
    dispatch(findRecipe(recipe.toLowerCase()))
    setErrors({
        vacio:'',
        msg:''
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