// functions
const {Diet} = require('../db.js');
const {Recipe} = require('../db.js')
const axios = require('axios')
const {API_KEY} = process.env;

/* con axios, hago las peticiones a la api, y me traigo todos los datos.
https://api.spoonacular.com/recipes/complexSearch?apiKey={API_KEY}&addRecipeInformation=true&number=100
lugar de donde traer 100 productos
// data --> results. results es el array que contiene los objetos con toda la info de las recetas!.
*/

// funciones para unir BD con api.
const getApi = async () =>{
    try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
        // const response = await axios.get('https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5')
        let results = await response.data.results.map(e => {
        return {
            id: e.id,
            vegetarian : e.vegetarian,
            title : e.title,
            diets: e.diets.map(e => {return {name: e}}),
            image: e.image,
            dishTypes: e.dishTypes.map(e => {return{name: e}}),
            healthScore: e.healthScore,
            summary: e.summary,
            steps: e.analyzedInstructions[0] && e.analyzedInstructions[0].steps?.map(e => e.step).join('')
        }
    })
    return results
    } catch (error) {
        console.log(error)
        return []
    }
}

const getDb = async () => {
    try {
      let db =  await Recipe.findAll({
            include: {

            model : Diet,

            attributes: ['name'],

            through:{
                attributes:[]
            }
        }
    })
    return db
    } catch (error) {
        console.log(error)
        return []
    }

}


const getAllinfo = async () => {
    const apiInfo = await getApi();
    if(!apiInfo){
        // validacion por si la apikey se acaba voy a buscar lo de base de datos
        const info = await getDb();
        return info
    }
    const dbInfo = await getDb();
    const info = apiInfo.concat(dbInfo);
    return info
}


module.exports = {
    getApi,
    getDb,
    getAllinfo
}