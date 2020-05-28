import { expect } from 'chai';

import Pantry from '../src/pantry.js';
import User from '../src/pantry.js';
import ingredientsData from '../src/data/ingredients.js';

let pantry;
let user

describe('Pantry', () => {
  beforeEach(() => {
    user = new User(1, 'Boba', [
      {
        'ingredient': 1077,
        'amount': 1
      },
      {
        'ingredient': 14412,
        'amount': 1
      },
      {
        'ingredient': 1009054,
        'amount': 3
      }]
    );

    pantry = new Pantry(user.pantry);
    recipe = new Recipe();

  });
  it('should be a function', function() {
    expect(Pantry).to.be.a('function')
  });

  it('should be an instance of a Pantry', function () {
    let pantry = new Pantry(user.pantry);
    expect(pantry).to.be.an.instanceof(Pantry);
  });

  it('should not need an argument to create a pantry', () => {
    expect(() => {
      new Pantry()
    }).to.not.throw(Error);
  })

  it('should be able to find missing ingredients', () => {
    pantry.findMissingIngredients();
    expect(pantry.findMissingIngredients).to.equal()
  })




  // it('Should be able to tell a user what ingredients are missing', () => {
  //   expect(pantry.compareIngredients).to.equal(recipeData[47].ingredients);
  // })


});