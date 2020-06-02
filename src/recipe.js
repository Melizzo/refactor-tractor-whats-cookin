class Recipe {
  constructor(recipe, ingredientsData) {
    if (recipe instanceof Object, ingredientsData instanceof Array) {
      this.name = recipe.name;
      this.id = recipe.id;
      this.ingredients = recipe.ingredients;
      this.instructions = recipe.instructions;
      this.tags = recipe.tags;
      this.ingredientsData = ingredientsData;
      this.isFavorite = false;
      this.isRecipeToCook = false;
    }
  }

  searchIngredientsById(ingredientsData) {
    if (ingredientsData) {
      const ingredientNames = this.ingredients.map(ingredient => {
        ingredientsData.find(item => {
          if (ingredient.id === item.id) {
            ingredient['name'] = item.name
          }
        })
        return ingredient
      })
      return ingredientNames
    } 
  }

  calculateCost() {
    let costCounter = 0;
    this.ingredients.forEach(ingredient => {
      this.ingredientsData.find(specificIngredient => {
        if (specificIngredient.id === ingredient.id) {
          costCounter += (Number(specificIngredient.estimatedCostInCents) *
          Number(ingredient.quantity.amount))
        }
      })
    });
    return costCounter;
  }
}

export default Recipe;
