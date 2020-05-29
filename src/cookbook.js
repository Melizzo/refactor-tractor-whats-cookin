class Cookbook {
  constructor(data) {
    this.recipes = data;
  }

  findRecipe(searchText) {
    return this.recipes.filter(recipe => {
      return recipe.ingredients.find(ingredient => {
        return (ingredient.name.includes(searchText)) ||
        (recipe.name.includes(searchText))
      });
    })
  }

  allPossibleIngredients() {
    let allIngredients = [];
    this.recipes.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        if(!allIngredients.includes(ingredient)) {
          allIngredients.push(ingredient)
        }
      })
    })
    return allIngredients
  }

  returnIngredientsWithNames(ingredientsData) {
    const allPossibleIngredients = this.allPossibleIngredients()
    const ingredientNames = allPossibleIngredients.map(ingredient => {
      ingredientsData.find(item => {
        if(ingredient.id === item.id) {
          ingredient['name'] = item.name
        }
      })
      return ingredient
    })

    return ingredientNames
  }
}

export default Cookbook;
