import { expect } from 'chai';

import Pantry from '../src/pantry.js';
import ingredientsData from '../src/data/ingredients.js';

let pantry;

describe('Pantry', () => {
  beforeEach(() => {
    pantry = new Pantry(userIngredients);

  });


  it('Should hold its own ingredient data', () => {
    expect(pantry.ingredients).to.equal(recipeData[47].ingredients);
  })


});