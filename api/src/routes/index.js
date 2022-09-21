const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

const recipes = require('./recipes.js') 
const diet = require('./diets.js')//post diet.
const filters = require('./filter.js')
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/recipes', recipes);
router.use('/diets', diet)
router.use('/filters', filters)


module.exports = router;
