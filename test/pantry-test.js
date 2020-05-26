import { expect } from 'chai';

import Pantry from '../src/pantry.js';
import ingredientsData from '../src/data/ingredients.js';

let pantry;

describe('Pantry', () => {
  beforeEach(() => {
    pantry = new Pantry(userIngredients);

  });


  it('Should be able to tell a user what ingredients are missing', () => {
    expect(pantry.compareIngredients).to.equal(recipeData[47].ingredients);
  })


});