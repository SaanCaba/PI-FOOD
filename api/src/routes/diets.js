const express = require('express')
const router = express.Router()
const {Diet} = require('../db.js')

// me guardo todas las dietas en Diets, con un get.
router.get("/", async (req, res) => {
    var apiDiets = [ 
      "gluten free",
      "dairy free",
      "ketogenic",
      "lacto ovo vegetarian",
      "vegan",
      "pescatarian",
      "paleolithic",
      "primal",
      "fodmap friendly",
      "whole 30",
    ];

    try {

    await apiDiets.map((d)=> {

         Diet.findOrCreate({

            where: {name : d}

        })
    })

    //en dbDiets tengo un arreglo con todas las dietas.
      const dbDiets = await Diet.findAll()
    //es lo que devuelvo.
      res.status(200).send(dbDiets);

    } catch (error) {
      console.log(error);
    }
  });



module.exports = router;