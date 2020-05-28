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

  it('should not require an argument to create a new Recipe', () => {
    expect(() => {
      new Recipe() 
    }).to.not.throw(Error);
  });

  it('should not break if arguments in constructor are wrong data type', () => {
    let recipe = new Recipe(32, {id: 2, name: 'Bill'})
    expect(recipe).to.be.an.instanceof(Recipe)
  })

  it('should not require all the properties to construct the recipe', () => {
    let brokenRecipe = {
      "name": "Loaded Chocolate Chip Pudding Cookie Cups",
      "id": undefined,
      "image": "https://spoonacular.com/recipeImages/595736-556x370.jpg",
      "ingredients": undefined,
      "instructions": [
        {
          "number": 1,
          "instruction": "In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy."
        }],
      "tags": undefined
    }

    let recipe = new Recipe(brokenRecipe, ingredientsData)
    expect(recipe.ingredients).to.equal(undefined)
  })

  describe('Recipe Data', () => {
    beforeEach(() => {
      recipe = new Recipe(recipeData[47], ingredientsData);
    });

    it('Should hold its own ingredient data', () => {
      expect(recipe.ingredients).to.equal(recipeData[47].ingredients);
    });

    it('Should hold its own instruction data', () => {
      expect(recipe.instructions).to.equal(recipeData[47].instructions);
    });

    it('Should hold its own ingredients data', () => {
      expect(recipe.ingredients).to.equal(recipeData[47].ingredients)
    });

    it('Should hold its own tags data', () => {
      expect(recipe.tags).to.equal(recipeData[47].tags)
    });

    it('Should hold its own id data', () => {
      expect(recipe.id).to.equal(recipeData[47].id)
    });

    it('Should hold its own name data', () => {
      expect(recipe.name).to.equal(recipeData[47].name)
    });

    it('Should have an isFavorite value of false', () => {
      expect(recipe.isFavorite).to.equal(false)
    });

    it('Should have an isRecipeToCook value of false', () => {
      expect(recipe.isRecipeToCook).to.equal(false)
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

    it('should return undefined if no ingredients data is passed in to searchIngredientsById Method', () => {
      expect(recipe.searchIngredientsById()).to.deep.equal(undefined)
    }) 

    it('Should be able to calculate the cost of its ingredients', () => {
  
      expect(recipe.calculateCost()).to.equal(4166);
    }); 
  });
});
