import { expect } from 'chai';

import Pantry from '../src/pantry.js';
import User from '../src/user.js';
import Recipe from '../src/recipe.js'
import recipeData from '../src/data/recipes.js'
import ingredientsData from '../src/data/ingredients.js';

let pantry;
let user;
let recipe

describe('Pantry', () => {
  beforeEach(() => {
    user = new User(1, 'Boba', [
      {
        'ingredient': 1041009,
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
    recipe = new Recipe(recipeData[47], ingredientsData)
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
    expect(pantry.findMissingIngredients(recipeData[47].ingredients)).to.deep.equal([
      {
        name: 'flatbread',
        id: 10018413,
        quantity: { amount: 1, unit: '' }
      },
      {
        name: 'fresh basil',
        id: 2044,
        quantity: { amount: 3, unit: 'leaves' }
      },
      {
        name: 'grape tomatoes',
        id: 10111529,
        quantity: { amount: 0.5, unit: 'cup' }
      },
      {
        name: 'olive oil',
        id: 4053,
        quantity: { amount: 1, unit: 'teaspoon' }
      },
      { name: 'zucchini', id: 11477, quantity: { amount: 1, unit: 'cup' } }  
    ])
  })

  it('it should find the ingredients that the user doesn/t have enough of', () => {
    expect(pantry.findIngredientsWeNeedMoreOf(recipeData[47].ingredients)).to.deep.equal([{
      id: 1041009,
      quantity: { amount: 1, unit: 'tablespoons' }
    },])
  })

  it('it should be able to combine two arrays', () => {
    expect(pantry.returnCombinedArrays(recipeData[47].ingredients)).to.deep.equal([{
          "id" : 10018413,
          "name": "flatbread",
          "quantity": {
            "amount": 1,
            "unit": ""
          }
        },
        {
          "id": 2044,
          "name": "fresh basil",
          "quantity": {
            "amount": 3,
            "unit": "leaves"
          }
        },
        {
          "id": 10111529,
          "name": "grape tomatoes",
          "quantity": {
            "amount": 0.5,
            "unit": "cup"
          }
        },
        {
          "id": 4053,
          "name": "olive oil",
          "quantity": {
            "amount": 1,
            "unit": "teaspoon"
          }
        },
        {
          "id": 11477,
          "name": "zucchini",
          "quantity": {
            "amount": 1,
            "unit": "cup"
          }
        },
        {
          "id": 1041009,
          "quantity": {
            "amount": 1,
            "unit": "tablespoons"
          }
        }])
  })




  // it('Should be able to tell a user what ingredients are missing', () => {
  //   expect(pantry.compareIngredients).to.equal(recipeData[47].ingredients);
  // })


});