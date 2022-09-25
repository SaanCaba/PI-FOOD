const express = require('express')
const router = express.Router()
const {getApi, getAllinfo, getDb} = require('./utils.js')
const {Recipe} = require('../db.js')
const {Diet} = require('../db.js')
const { default: axios } = require('axios')
const {API_KEY} = process.env;

router.get('/', async (req,res) => {
    const {name} = req.query;
    let allRecipes = await getAllinfo();
   try{
    if(name){
        //si tiene name traigo las de name, si no, abajo retorno todas
        let recipeName = await allRecipes.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
      return  recipeName.length ? res.json(recipeName) : res.status(404).send('no hay ninguna receta con ese nombre')
    }else{
        return res.json(allRecipes)
    }
// ------------ USO UNICAMENTE LAS DE BASE DE DATOS, API CAIDA.--------------------
    // let dbRecipes = await getApi()
    // try{
    //     if(name){
    //         let recipeName = await dbRecipes.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
    //   return  recipeName.length ? res.json(recipeName) : res.status(404).send('no hay ninguna receta con ese nombre')
    //     }else{
    //         return res.json(dbRecipes)
    //     }

    } catch (error) {
        res.status(404).send(error)
    }
})

router.get('/:idReceta', async (req,res)=> {
    const {idReceta} = req.params;

    try {
        if(idReceta.length > 7){
            // este id es creado por post. y tiene el id de UUID.
            let dbInfo = await getDb();
    
            let filterId = dbInfo.filter(e => e.id === idReceta)
    
            return res.json(filterId)
    
        }
          let realId = Number(idReceta)
        // si no esta en db, lo voy a buscar a esta url por id.
        let allInfo = await axios.get(`https://api.spoonacular.com/recipes/${realId}/information?apiKey=${API_KEY}`);
        let arr = [] // meto allInfo enn un array para poder trabajarlo mejor
        arr.push(allInfo.data)
        let response = arr.map(e => {
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
        // // con MOCK API.
        // let allInfo = await getAllinfo()
        // let filtrado = allInfo.filter(e => e.id === realId)
        // res.json(filtrado)
        res.json(response)
    }catch(error) {

        console.log(error)

        res.status(404).json({err: error})

    }

})

router.post('/', async(req,res) => {
    
    let {
        title,
        summary,
        healthScore,
        dishType,
        image,
        steps,
        diets,
    } = req.body;
    
    if(!title) return res.status(404).send('Falta el title')
   
    if(!summary) return res.status(404).send('Faltan summary')

    /*
    Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
    Crea una receta en la base de datos relacionada con sus tipos de dietas. 
    */
    try {
        let newRecipe = await Recipe.create({
            title,
            summary,
            healthScore,
            dishType,
            image,
            steps
            // no se le pasa diets porque tiene la relacion aparte.
        })
//a la dieta la encontramos en el modelo de dietas por eso no lo ponemos en recipeCreate
    let createDiet = await Diet.findAll({

            where : {name : diets}

        })
        
        newRecipe.addDiet(createDiet)//agregamos la dieta que coincidieron
        
        return res.status(201).json('nueva receta creada!')
    
    } catch (error) {
        
        console.log(error)
        res.status(404).json({err: 'error', error})
    }
})


module.exports = router;
