const { Diet, conn } = require('../../src/db.js');
const { expect } = require('chai');


describe('Diet model', () => {
  before(() => conn.authenticate()
    .catch((err)=>{
      console.error('No podemos conectar con base de datos', err);
    })
  );

  describe('Validaciones', () =>{
    beforeEach(()=> Diet.sync({force:true}))
    describe('name', () =>{
      it('Devolver un error si el nombre es null', (done) =>{
        Diet.create({})
        .then(()=> done(new Error('Se requiere completar con un nombre valido')))
        .catch(()=> done())
      })
      it('Debe funcionar con un nombre valido', ()=>{
        Diet.create({name:'vegetariana-testing'})
      })
    })

  })

})

// describe('Recipe model', () => {
//   before(() => conn.authenticate()
//     .catch((err) => {
//       console.error('Unable to connect to the database:', err);
//     }));
//   describe('Validators', () => {
//     beforeEach(() => Recipe.sync({ force: true }));
//     describe('name', () => {
//       it('should throw an error if name is null', (done) => {
//         Recipe.create({})
//           .then(() => done(new Error('It requires a valid name')))
//           .catch(() => done());
//       });
//       it('should work when its a valid name', () => {
//         Recipe.create({ name: 'Milanesa a la napolitana' });
//       });
//     });
//   });
// });
