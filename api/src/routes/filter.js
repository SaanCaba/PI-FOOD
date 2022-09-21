const express = require('express')
const router = express.Router()
const {getApi, getAllinfo, getDb} = require('./utils.js')

router.get('/orderAZ-ZA', async(req,res) => {
    const {order} = req.query

    let recipes = await getAllinfo()
    let orden;
    try {
        // 'asc' o 'desc'
        
        if(order){
            if(order === 'asc'){
          orden =  recipes.sort((a,b) =>a.title.toLowerCase().localeCompare(b.title.toLowerCase()))
        }
        else if(order === 'desc'){
            orden =   recipes.sort((a,b) =>b.title.toLowerCase().localeCompare(a.title.toLowerCase()))
        }else{
            return res.status(404).json('orden inexistente')
        }
        return   res.json(orden)
    }

      return   res.status(404).json('no hay order')
    } catch (error) {
        console.log(error)
    }

})


router.get('/orderHS', async(req,res) =>{
    const {saludable} = req.query

    let recipes = await getAllinfo()

    try {
            if(saludable=== 'massaludable'){
            let orden = recipes.sort((a,b)=> b.healthScore - a.healthScore) 
            return res.json(orden)  
            }else if(saludable === 'menossaludable'){
             let orden = recipes.sort((a,b)=> a.healthScore - b.healthScore)   
             return res.json(orden)   
            }else{
                return res.status(404).json('no existe')
            }
        // return res.json(recipes)
    } catch (error) {
        console.log(error)
    }

})


module.exports = router