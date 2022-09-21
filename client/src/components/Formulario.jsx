import React from 'react'
import {useState, useEffect} from 'react'
import { createRecipe, getDiets } from '../actions/index'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import './styles/Formulario.css'



let simbols = ['?','¿','=','/','%','$','#','.',',','-','_','!','¡']

function validate(recipe){
  let errors = {}
  if(recipe.summary === '' && recipe.title === '' && recipe.diets.length === 0){
    errors.todos = 'faltan el title, resumen, Healt Score y alguna dieta.'
    console.log(errors.todos)
    return errors
  }else{
  errors.diets =[];
  errors.title = ''
  errors.summary = ''
  }
  if(recipe.title === ''){
    errors.title = 'no hay nombre'
  }
  if(recipe.summary === ''){
    errors.summary = 'no hay resumen'
  }
  if(recipe.diets.length === 0){
    errors.diets = 'hay que seleccionar una dieta'
  }
  if(recipe.healthScore === ''){
    errors.healthScore = 'Hay que seleccionar un Health Score'
  }
  if(Number(recipe.healthScore) < 0 || Number(recipe.healthScore) > 100){
    errors.healthScore = 'Health score debe ser mayor a cero y menor a cien'
  }
  let find = simbols.find(e => recipe.title.includes(e))
  if(find){
    errors.title = 'Simbolos no válidos'
  }
  return errors
}


function Formulario() {
    const dispatch = useDispatch()
    // const history = useHistory()
    const typeDiets = useSelector(state => state.diets)
    const [creado, setCreado] = useState('')
    const [errors, setErrors] = useState({})

   useEffect(()=>{
    dispatch(getDiets())
   },[dispatch])

    const [recipe, setRecipe] = useState({
        title: '',
        summary: '',
        healthScore: '',
        steps:'',
        dishType:'',
        image:'', //imagen por default
        diets:[]
    })
    const handleChange = (e) => {
        setRecipe({
          ...recipe,
          [e.target.name] : e.target.value
        })
    }


    const handleSelect = (e) => {
      setRecipe({
        ...recipe,
        diets:[...recipe.diets, e.target.value]
      })

    }
    const handleSubmitForm = (e) => {
        e.preventDefault()
        if(recipe.summary === '' && recipe.title === '' && recipe.healthScore === '' && recipe.diets.length === 0){
          console.log('entre')
          return setErrors(validate(recipe))
        }
        if(recipe.title === ''){
          return setErrors(validate(recipe))
        }
        if(recipe.title){
          let find = simbols.find(e => recipe.title.includes(e))
          if(find){
            return setErrors(validate(recipe))
        }
        }
        if(recipe.summary === ''){
          return setErrors(validate(recipe))
        }
        if(recipe.diets.length === 0){
          return setErrors(validate(recipe))
        }
        if(recipe.healthScore === ''){
          return setErrors(validate(recipe))
        }
        if(Number(recipe.healthScore) < 0 || Number(recipe.healthScore) > 100){
          return setErrors(validate(recipe))
        }
        if(recipe.image.length === 0){
          recipe.image = 'http://img.viajeauruguay.com/fettuccine-alfredo-2.jpg' // si no ponen imagen ponemos esta.
        }
        dispatch(createRecipe(recipe))
        // history.push('/home')
        setRecipe({
          title: '',
          summary: '',
          healthScore: '',
          steps:'',
          dishType:'',
          image:'',
          diets:[]
      })
      setCreado('Receta creada con éxito')
    }
  return (
    <div className='contenedor'>
        <Link to="/home"><button className='button-home'>Home</button></Link>
        <form className='form'  onSubmit={(e)=> handleSubmitForm(e)}>
        <h3>Crea tu propia receta!</h3>
          <div className='contenedor-principal'>
            <label>Nombre: </label>
            <input value={recipe.title} name="title" type='text'  onChange={(e)=> handleChange(e)} /> 
            <br/>
            {errors.title && (
            <span className='error'>{errors.title}</span>
            
        )}
            <br />
            <label>Resumen: </label>
            <textarea value={recipe.summary} name="summary" type='text'  onChange={(e)=> handleChange(e)} />
            <br />
              {/*aca van los erorres entre medio de estos */}
              {errors.summary && (
            <span className='error'>{errors.summary}</span>
            
        )}
            <br/>
            <label>Health Score: </label>
            <input  value={recipe.healthScore} name="healthScore" type='number'  onChange={(e)=> handleChange(e)}/>
            <br />
            {errors.healthScore && (
            <span className='error'>{errors.healthScore}</span>
            
        )}
            <br />
            <input value={recipe.image} name='image' type='text' placeholder='Colocar url de la imagen...' onChange={(e)=> handleChange(e)} />
            <br/>
            <label>Pasos: </label>
            <textarea value={recipe.steps} name="steps" type='text' onChange={(e)=> handleChange(e)} />
        <br/>
        <br/>
            <label>Tipo de Plato: </label>
            <input  value={recipe.dishType} name="dishType" type='text' onChange={(e)=> handleChange(e)} />
            <div>
              <label>Tipo de Dieta: </label>
              <select onChange={(e)=> handleSelect(e)}>
                {typeDiets && typeDiets.map(d =>{
                  return(
                  <option key={d.id} value={d.name}>{d.name}</option>
                )})}
              </select>
            </div>
            {errors.diets && (
            <span className='error'>{errors.diets}</span>
            
        )}
        <br/>
        {errors.todos && (
            <span className='error'>{errors.todos}</span>
            
        )}
            <br />
            {
              creado  ? <span>{creado}</span> : ''
            }
            <br/>
            <button type="submit">Crear Receta</button>
            </div>
        </form>
    </div>
  )
}

export default Formulario