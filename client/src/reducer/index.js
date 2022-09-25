import {GET_ALL_RECIPES, GET_RECIPE_DETAIL, FILTER_BY_ORDER_BK, FILTER_RECIPES_HS_BK, CREATE_RECIPE, GET_DIETS, DELETE_RECIPE, FILTER_RECIPES_BY_DIETS, FILTER_BY_VEGETARIAN, FILTER_RECIPES_BY_ORDER, CREATED_IN_DB, FILTER_RECIPES_HS, SEARCH_RECIPE, CLEAR_RECIPE_DETAIL} from '../actions/index.js'


const initialState = {
    recipes: [],
    recipeDetail : {},
    allRecipes : [],
    diets:[]
}



function rootReducer(state = initialState, action){
    switch(action.type) {

        case GET_ALL_RECIPES:
            return{
                ...state,
                recipes: action.payload,
                allRecipes : action.payload
                // en action.payload me traigo todo de la api y base de datos, recipes y allRecipes tienen todo.
                //allRecipes, es una copia que va a tener siempre todo completo, para que no se borre el original.
            }
        case GET_DIETS:
            return{
                ...state,
                diets: action.payload
            }
        case FILTER_RECIPES_BY_DIETS:
            const allRec = state.allRecipes
            //state.allRecipes, me permite no trabajar sobre el state.recipes, es otro aparte.
            // no modicifo el de get_all_recipes, que es el que renderiza. =)
                
            const filtrado = 
                action.payload === "Todas" 
                ? allRec
                : allRec.filter(e => 
                    e.diets.find(e => e.name === action.payload))
                    // e.diets.find(e => e.name === action.payload)}); console.log(filtrado)
                if(filtrado.length === 0) alert(`Con el tipo de dieta ${action.payload}, no hay nada disponible`)
            return{
                ...state,
                recipes: filtrado
            }
        case FILTER_BY_VEGETARIAN:
            const allRecVeg = state.allRecipes
            const filtradoVeg = allRecVeg.filter(e => e.vegetarian === true)
            console.log(filtradoVeg)
            if(filtradoVeg.length === 0) alert('Con el tipo de dieta vegetarian, no hay nada disponible')
            return {
                ...state,
                recipes: filtradoVeg
            }
        case FILTER_RECIPES_BY_ORDER:
            //ordenar por 'asc' o 'desc', y por el healthScore
            const recipesToOrd = state.recipes

            const nameSort = 
            action.payload === 'asc'
            ? recipesToOrd.sort((a,b) =>a.title.toLowerCase().localeCompare(b.title.toLowerCase()))
            : recipesToOrd.sort((a,b) =>b.title.toLowerCase().localeCompare(a.title.toLowerCase()))
            console.log(nameSort)

        return{
            ...state,
            recipes:  nameSort
        }

        case FILTER_BY_ORDER_BK:
        
        return {
            ...state,
            recipes: action.payload
        }

    case CREATED_IN_DB:
        //createdINBd
        const allRecDb = state.allRecipes

        const dbFilter = 
        action.payload === "db" ? allRecDb.filter(e => e.createdINBd === true) : allRecDb.filter(e => !e.createdINBd) // o puedo traer !e.createdINBd
    return{
        ...state,
        recipes: action.payload === 'All' ? allRecDb : dbFilter
    }

    case FILTER_RECIPES_HS:
    
    const allRecHs = state.allRecipes

    const hsSort =
    action.payload === "+ saludable" ? allRecHs.sort((a,b) => b.healthScore - a.healthScore) : allRecHs.sort((a,b) => a.healthScore - b.healthScore)
    return{
        ...state,
        recipes: hsSort
        }
    
    case FILTER_RECIPES_HS_BK:
        return{
            ...state,
            recipes: action.payload
        }
    
    case SEARCH_RECIPE:
        const findRecipe =
        action.payload ? state.allRecipes.filter(e => e.title.toLowerCase().includes(action.payload)) : state.allRecipes
         if(findRecipe.length === 0) alert(`Con el nombre ${action.payload} no hay recetas, ingrese otra.`)
        return {
        ...state,
        recipes: findRecipe
    }

    case GET_RECIPE_DETAIL:
    return {
        ...state,
        recipeDetail: action.payload
    }
    
    case CLEAR_RECIPE_DETAIL:
    
    return{
        ...state,
        recipeDetail: state.recipeDetail.shift()
    }

    case CREATE_RECIPE:

    return{
        ...state
    }

    case DELETE_RECIPE:
    let filtradoDlt = state.recipes.filter(e => e.id !== action.payload)
    console.log(filtradoDlt)
    return{
        ...state,
        recipes: filtradoDlt
    }
     default:
        return state;   
    }
}

export default rootReducer