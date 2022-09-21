/* eslint-disable import/no-extraneous-dependencies */
const expect  = require('chai').expect
const session = require('supertest-session');
const request = require('supertest')
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');


const agent = session(app);

const recipe = {
    title: 'Tacos',
    summary:'Cocinar la carne, luego emplatar en la tortilla'
}

describe('Ruta de recetas', ()=>{
    before(()=> conn.authenticate()
    .catch((error) => {
        console.error('No podemos conectar con la base de datos', error)
    })
    )
    beforeEach(()=> Recipe.sync({force:false})
    .then(()=> Recipe.create(recipe)))
      describe('GET /recipes', () => {
    it('should get 200', () =>
      agent.get('/recipes').expect(200)
      .expect('Content-Type', /json/)
    );
  });
})


