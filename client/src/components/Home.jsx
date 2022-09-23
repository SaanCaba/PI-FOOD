import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getRecipes } from '../actions/index'
import { Link } from 'react-router-dom'
import Card from './Card'
import Paginado from './Paginado'
import {filterRecipesHealthScoreBK, filterRecipesByOrderBk,filterRecipesByDiets, filterRecipesByOrder, filterRecipesByDb, filterRecipesHealthScore, filterByVegetarian} from '../actions/index.js'
import SearchBar from './SearchBar'
import './styles/Home.css'
import Loader from './Loader'
import refresh from'./styles/imagenes/refresh.png'
import flecha from './gifs/flecha2.png'

function Home() {

    const dispatch = useDispatch()
    const allRecipes = useSelector(state => state.recipes)
    const [orden, setOrden] = useState('')

    const [error, setErrors] = useState({
        dontFound : ''
    })

    // -----PAGINADO-----
    //pagina actual, 1 porque arranco el la primer pag
    const [currentPage, setCurrentPage] = useState(1)
    // guardamos cuantas recetas queremos por pagina, el readme dice 9, mostramos 9
    const [recipesPerPage, setRecipesPerPage] = useState(9)
    //indice del ultimo personaje de la pagina
    const indexLastRecipe = currentPage * recipesPerPage;
    //indice del primer personaje, tengo que tener siempre este indice.
    const indexFirstRecipe = indexLastRecipe - recipesPerPage
    //los personajes que estan en la pagina actual, agarro los primeros 9, el slice devuelve un arreglo desde el indexFirstRecipe hasta el indexLastRecipe
    //currentRecipes, se va a ir guardando, lo que va a mostrar, dependiendo del numero de pagina, la más importante.
    // se va a ir modificando, dependiendo de la página en la que esté.
    const currentRecipes = allRecipes.slice(indexFirstRecipe, indexLastRecipe)
    // paginado, va a setear la pagina donde estemos, en Paginado.jsx, le paso el indice(numero de pag), con esto modificamos el slice
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }


    useEffect(()=>{
       dispatch(getRecipes()) 
    },[dispatch])// dentro del array, va de lo que de depende el useEffect
    // el useEffect, cada vez que se monte el componente, ejecutara ese dispatch
   
    const handleClick = (e) => {
        e.preventDefault();
        dispatch(getRecipes())
        // resetea todo devuelta!
    }
    
    const handleFilterDiets =  (e) => {
        e.preventDefault()
        console.log(allRecipes)
        if(allRecipes.length === 0){
         return   setErrors({
                dontFound: 'no hay nada con ese tipo de dieta'
            })
        }
        if(e.target.value === 'vegetarian'){
            setCurrentPage(1)
            return dispatch(filterByVegetarian(e.target.value))
        }
        setCurrentPage(1);
        setErrors({
            dontFound:''
        })
        dispatch(filterRecipesByDiets(e.target.value))
    }

    const handleFilterDb = (e) => {
        e.preventDefault()
        setCurrentPage(1);
        dispatch(filterRecipesByDb(e.target.value))
    }
    
    const handleFilterByOrder = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        dispatch(filterRecipesByOrderBk(e.target.value))
        // setCurrentPage(1);// aca seteo para que arranque a ordenar desde la pagina 1
        // setOrden se usa para que modifique el estado actual y renderize
        // es clave, sin esto no funciona, simplemente es un estado local que inicia vacio, y cada vez que se ejecuta
        // el accionar del filtro, cambia los valores de 'orden', para que se ejecute
        setOrden('Ordenado ' + e.target.value)
    }

    const handleOrderByHealthScore = (e) => {
        e.preventDefault()
        dispatch(filterRecipesHealthScoreBK(e.target.value))
        setCurrentPage(1);
        setOrden('Ordenado ' + e.target.value)
    }

    return (
    
    <div className='background-home'>
        <br/>
        <div className='content-btncrear'>
        <Link className='btn-crear' to="/recipes" id='top'>
        CREAR RECETA
        </Link>
        </div>
        <h1 className='title'>RECETAS PI FOOD</h1>
        <button className='refresh' onClick={(e)=> handleClick(e)}>
            <img className='img-refresh' src={refresh} alt='' />
        </button>
        <SearchBar />
        <div className='cont-select'>
            <h2 className='title-selects'>Ordenamientos</h2>
            <div className='selects'>
            <select className='slc-ord' onChange={(e)=> handleFilterByOrder(e)}>
                <option value='ord'>Ordenar</option>
                <option value='asc'>A-Z</option>  {/* las options siempre van a necesitar un value */}
                <option value='desc'>Z-A</option>
            </select>
            <select className='slc-crt' onChange={(e) => handleFilterDiets(e)}>
                {/*filtro por tipo de dieta.*/}
                {/*en value va lo que tenemos en el BACK */}
                <option value='Todas'>All</option>
                <option value='vegan'>Vegan</option>
                <option value='vegetarian'>Vegetarian</option>
                <option value="gluten free">Gluten Free</option>
                <option value="dairy free">Dairy Free</option>
                <option value="ketogenic">Ketogenic</option>
                <option value="lacto ovo vegetarian">Lacto Ovo Vegetarian</option>
                <option value="pescatarian">Pescatarian</option>
                <option value="paleolithic">Paleolithic</option>
                <option value="primal">Primal</option>
                <option value="fodmap friendly">Fodmap Friendly</option>
                <option value="whole 30">Whole 30</option>
            </select>
            <select className='slc-ext' onChange={(e)=> handleFilterDb(e)}>
                <option value='All'>Existentes</option>
                <option value='db'>Creados</option>
            </select>
            <select className='slc-sal' onChange={(e)=> handleOrderByHealthScore(e)}>
                <option value='saludables'>Saludables</option>
                <option value='massaludable'>+ Saludables</option>
                <option value='menossaludable'>- Saludables</option>
            </select>
            {/*hago el map a las recetas del slice*/}
            </div>
            </div>
            <Paginado
            recipesPerPage={recipesPerPage}
            allRecipes={allRecipes.length} // necesitamos un valor numerico, por eso el length
            paginado= {paginado}
            />
            {
                error.dontFound && (
                    <h1>{error.dontFound}</h1>
                )
            }
            <div className='container-cards'>
            <div className='cards'>
        {allRecipes.length>0? currentRecipes?.map(e => {

          return ( 
            
          <Card 
            key= {e.id}
            title= {e.title}
            image= {e.image}
            diet= {e.createdINBd ? 
                e.diets.map(e => e.name + ', ').join(' ') :
                e.diets.map(e => e.name + ', ').join(' ') + ' '
            }
            healthScore= {e.healthScore}
            id={e.id}
            />
            )
          })
          : <Loader />
        }
        {/* {recipesError.length === 0 ? <span className='error'>NO HAY NADA CON ESE NOMBRE</span>: ''} */}
        </div>
        </div>
        <a className='flecha' href='#top'> 
        <img className='img-flecha' id='bottom' src={flecha} alt='img dont found' />
        </a>

    </div>

    )
}

export default Home