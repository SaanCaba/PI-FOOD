// const rootReducer = require("../src/reducer")
// const {
//     GET_ALL_RECIPES,
//     GET_RECIPE_DETAIL,
//     deleteRecipe
// } = require("../src/actions")

// jest.mock('../src/actions', () => ({
//     __esmodules: true,
//     GET_ALL_RECIPES : 'GET_ALL_RECIPES',
//     GET_RECIPE_DETAIL : 'GET_RECIPE_DETAIL',
//     deleteRecipe : (id) => ({
//         type: "DELETE_RECIPE",
//         payload : id
//     })
// }))

// describe("reducer", () => {
//     const state = {
//         recipes: [],
//         recipeDetail : {}
//     };

//     it('Debería eliminar una receta de nuestro arreglo recipes. action="DELETE_RECIPE"', () => {
//         payload = 1;
//         const state = {
//             recipes : [
//                 {
//                     id: 1,
//                     title:'milanesa',
//                     summary:'comida tipica argentina',
//                     healthScore:60,
//                     image: 'http://img.viajeauruguay.com/fettuccine-alfredo-2.jpg',
//                     steps:'empanado, freir, comer',
//                     dishType:'lunch, dinner',
//                     diets:['whole 30']
//                 },
//             ],
//             recipeDetail:{},
//         };

//         expect(rootReducer(state,deleteRecipe(payload))).toEqual({
//         recipes: [],
//         recipeDetail : {}
//         })
//     })
// })