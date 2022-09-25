import React from 'react'
import {useState, useEffect} from 'react'
import { createRecipe, getDiets, getRecipes } from '../actions/index'
import {useDispatch, useSelector} from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import './styles/Formulario.css'



let simbols = ['?','¿','=','/','%','$','#','.',',','-','_','!','¡']

function validate(recipe){
  let errors = {}
  if(Number(recipe.healthScore) < 0 || Number(recipe.healthScore) > 100){
    errors.healthScore = 'Health score debe ser mayor a cero y menor a cien'
  }
  let find = simbols.find(e => recipe.title.includes(e))
  if(find){
    errors.title = 'Simbolos no válidos'
  }
  errors.todos = ''
  return errors
}


function Formulario() {
    const dispatch = useDispatch()

    const history = useHistory()

    const typeDiets = useSelector(state => state.diets)

    const allRecipes = useSelector(state => state.recipes)

    const [errorRepetido, setErrorRepetido] = useState('')

    const [sinCompletar, setSinCompletar] = useState('')

    const [errors, setErrors] = useState({
      title: '',
      diets:'',
      summary:'',
      healthScore:''
    })

   useEffect(()=>{
    dispatch(getRecipes())
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
        setErrors({
          title: '',
          diets:'',
          summary:'',
          healthScore:''
        })
        setErrorRepetido('')
        setSinCompletar('')
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
          return setSinCompletar(`Hay que completar obligatoriamente Nombre, summary, HealthScore, y seleccionar una dieta`)
        }
        if(recipe.title === ''){
          return setErrors({
            title : 'No seleccionaste un title'
          })
        }
        if(recipe.title){
          let find = simbols.find(e => recipe.title.includes(e))
          if(find){
            return setErrors(validate(recipe))
        }
        if(recipe.title.length >= 20){
          return setErrors({
            title: 'El title es demasiado grande.'
          })
        }
        }
        if(recipe.summary === ''){
          return setErrors({
            summary:'No seleccionaste summary'
          })
        }
        if(recipe.diets.length === 0){
          return setErrors({
            diets: 'No seleccionaste dietas'
          })
        }
        if(recipe.healthScore === ''){
          return setErrors({
            healthScore:'no seleccionaste healtscore'
          })
        }
        if(Number(recipe.healthScore) < 0 || Number(recipe.healthScore) > 100){
          return setErrors(validate(recipe))
        }
        if(recipe.image.length === 0){
          recipe.image = 'http://img.viajeauruguay.com/fettuccine-alfredo-2.jpg' // si no ponen imagen ponemos esta.
        }
        let repeatTitle = allRecipes.filter(e => e.title === recipe.title)
        if(repeatTitle.length){
        return setErrorRepetido(`el nombre: ${recipe.title} ya existe`)
        }
        
        history.push('/home')
        dispatch(createRecipe(recipe))

        setRecipe({
          title: '',
          summary: '',
          healthScore: '',
          steps:'',
          dishType:'',
          image:'',
          diets:[]
      })
      setErrorRepetido('')
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
            {
              errorRepetido && (
                <span className='error'>{errorRepetido}</span>
              )
            }
            <br />
            <label>Resumen: </label>
            <textarea value={recipe.summary} name="summary" type='text'  onChange={(e)=> handleChange(e)} />
            <br />
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
        {sinCompletar && (
          <span className='error'>{sinCompletar}</span>
        )}
            <br/>
            <br/>
            <br/>
            <button type="submit">Crear Receta</button>
            </div>
            <span>Podes ver tu receta abajo</span>
        </form>

        <h1 className='tu-receta'>TU RECETA: </h1>
        {recipe.title ? <div className='container-recipecreada'> 
              <h2 className='recipe-title'>{recipe.title}</h2>
              <h5 className='dieta'>{recipe.diets + ''}</h5>
              <img className='recipe-img' src={recipe.image} />
              <br />
              {recipe.healthScore > 50 ? <label className='healthScore-green'>💚 %{recipe.healthScore}</label>
            :<label className='healthScore-red'>⚠️ %{recipe.healthScore}</label>
            }
              </div> :''}

    </div>
  )
}

export default Formulario