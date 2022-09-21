import React from 'react'
import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { findRecipe } from '../actions/index'
import { getRecipes } from '../actions/index'
import './styles/SearchBar.css'

function validate(value){
    let errors = {}
    // input es el estado local
    if(!value){
        errors.vacio = 'El buscador está vacío '
        return errors
    }
    if(value.length === 0){
        errors.msg = 'no hay nada con ese valor'
        return errors
    }
    if(value){
        errors.vacio=''
        errors.msg = ''
        return errors
    }

}

function SearchBar() {
    const findRecipes = useSelector(state => state.recipes)
    const[recipe, setRecipe] = useState('')
    const[errors, setErrors] = useState({})
    const dispatch = useDispatch()
    // const recipes = useSelector(state => state.recipes)

    //manejador del input (input de busqueda)
    const handleChange = (e) => {
        e.preventDefault()
        setErrors(e.target.value)
        setRecipe(e.target.value)
    }
    useEffect(()=>{
        dispatch(getRecipes())
    },[dispatch])
    //manejador del submit(boton de busqueda)
    const handleSubmit = (e) => {
        e.preventDefault()
    if(recipe === ''){
        dispatch(findRecipe(recipe.toLowerCase()))
        setErrors(validate(e.target.value))
    }
    if(findRecipes.length === 0){
        dispatch(findRecipe(recipe.toLowerCase()))
       setErrors(validate(findRecipes))
    }
    else{
        setErrors(validate(findRecipes))
        setErrors(validate(recipe))
        dispatch(findRecipe(recipe.toLowerCase()))
     }
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