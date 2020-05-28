import { expect } from 'chai';

import Recipe from '../src/recipe.js';
import recipeData from '../src/data/recipes.js';
import ingredientsData from '../src/data/ingredients.js';

let recipe;

describe('Recipe', () => {
  it('should be a function', function() {
    expect(Recipe).to.be.a('function');
  });

  it('should be an instance of a Recipe', function () {
    let recipe = new Recipe(recipeData[47], ingredientsData);
    expect(recipe).to.be.an.instanceof(Recipe);
  });

  it('should not require an argument to create a new User', () => {
    expect(() => {
      new Recipe() 
    }).to.not.throw(Error);
  });

  describe('Recipe Data', () => {
    beforeEach(() => {

      recipe = new Recipe(recipeData[47], ingredientsData);
    });

    it('Should hold its own ingredient data', () => {
      expect(recipe.ingredients).to.equal(recipeData[47].ingredients);
    })

    it('Should hold its own instruction data', () => {
      expect(recipe.instructions).to.equal(recipeData[47].instructions);
    })
  })

  describe('Recipe Methods', () => {
    beforeEach(() => {
    recipe = new Recipe(recipeData[47], ingredientsData);
    });

    it('Should be able able to search the ingredients dataset to find and an ingredients name', () => {
     expect(recipe.searchIngredientsById(ingredientsData)).to.deep.equal([
        {
          name: 'cheese',
          id: 1041009,
          quantity: { amount: 2, unit: 'tablespoons' }
        },
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
          name: 'grape tomato',
          id: 10111529,
          quantity: { amount: 0.5, unit: 'cup' }
        },
        {
          name: 'pure olive oil',
          id: 4053,
          quantity: { amount: 1, unit: 'teaspoon' }
        },
        {
          name: 'zucchini squash',
          id: 11477,
          quantity: { amount: 1, unit: 'cup' }
        }
      ])
    }) 
  })

  // it('Should be able to calculate the cost of its ingredients', () => {

  //   expect(recipe.calculateCost()).to.equal(4166);
  // });


});
