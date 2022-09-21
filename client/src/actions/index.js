import axios from 'axios'

export const GET_ALL_RECIPES = "GET_ALL_RECIPES";
export const GET_RECIPE_DETAILS = "GET_RECIPE_DETAILS"
export const CREATE_RECIPE = "CREATE_RECIPE";
export const DELETE_RECIPE = "DELETE_RECIPE";
export const FILTER_RECIPES_BY_DIETS = "FILTER_RECIPES_BY_DIETS";
export const FILTER_RECIPES_BY_ORDER = "FILTER_RECIPES_BY_ORDER";
export const CREATED_IN_DB = "CREATED_IN_DB";
export const FILTER_RECIPES_HS = "FILTER_RECIPES_HS";
export const SEARCH_RECIPE = "SEARCH_RECIPE";
export const GET_RECIPE_DETAIL = "GET_RECIPE_DETAIL";
export const CLEAR_RECIPE_DETAIL = "CLEAR_RECIPE_DETAIL"
export const GET_DIETS = "GET_DIETS"
export const FILTER_BY_VEGETARIAN = "FILTER_BY_VEGETARIAN";
export const FILTER_BY_ORDER_BK = "FILTER_BY_ORDER_BK";
export const FILTER_RECIPES_HS_BK = "FILTER_RECIPES_HS_BK";

export function getRecipes() {
    return async function(dispatch){
       let json = await axios.get("http://localhost:3001/recipes")
       //aca se conecta el back con el front 
       return dispatch({type: GET_ALL_RECIPES, payload: json.data })
    }
}

export function getDiets(){
    return async function(dispatch){
        let json = await axios.get("http://localhost:3001/diets")
        return dispatch({type:GET_DIETS, payload: json.data})
    }
}

// los payload van a ser lo que pongo en el value de option
export function filterRecipesByDiets(payload){
    // console.log(payload)
    return {
        type: FILTER_RECIPES_BY_DIETS, payload: payload
    }
}

export function filterByVegetarian(payload){
    return {
        type: FILTER_BY_VEGETARIAN, payload:payload
    }
}

export function filterRecipesByOrder(payload){
    return{
        type:FILTER_RECIPES_BY_ORDER, payload : payload
    }
}

export function filterRecipesByOrderBk(payload){
    return async function(dispatch){
        let json = await axios.get(`http://localhost:3001/filters/orderAZ-ZA?order=${payload}`)
        console.log(json)
        console.log(payload)
         return dispatch({type:FILTER_BY_ORDER_BK, payload: json.data})
    }
}

export function filterRecipesByDb(payload){
    return {
        type:CREATED_IN_DB, payload: payload
    }
}

export function filterRecipesHealthScore(payload){
    return{
        type:FILTER_RECIPES_HS, payload: payload
    }
}

export function filterRecipesHealthScoreBK(payload){
    return async function(dispatch){
        let json = await axios.get(`http://localhost:3001/filters/orderHS?saludable=${payload}`)
        return dispatch({type:FILTER_RECIPES_HS_BK, payload: json.data})
    }
}

export function findRecipe(payload){
    return{
        type: SEARCH_RECIPE, payload: payload
    }
}

export function getRecipeDetail(id){
    return async function(dispatch){
       let json = await axios.get(`http://localhost:3001/recipes/${id}`)
       return dispatch({type: GET_RECIPE_DETAIL, payload: json.data})
    }
}

export function clearRecipeDetail(){
    return{
        type: CLEAR_RECIPE_DETAIL, payload: ''
    }
}   


export function createRecipe(payload){
   return async function(dispatch){
    let json = await axios.post(`http://localhost:3001/recipes`, payload)
    return json
    }
}

export function deleteRecipe(id){
    return {
        type: DELETE_RECIPE, payload: id
    }
}
