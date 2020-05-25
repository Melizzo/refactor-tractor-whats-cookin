class Cookbook {
  constructor(data, recipeWithNames) {
    this.recipes = data;
    this.recipesWithNames = recipeWithNames
  }

  findRecipe(searchText) {
    return this.recipes.filter(recipe => {
      return recipe.ingredients.find(ingredient => {
        return (ingredient.name.includes(searchText)) ||
        (recipe.name.includes(searchText))
      });
    })
  }

  addNameToRecipeIngredients(ingredientsData) {
    console.log('recipes', this.recipes)
    const ingredientNames = this.recipes.map(recipe => {
      recipe.ingredients.forEach(ingredient => {
        ingredientsData.forEach(item => {
         if(ingredient.id === item.id) {
           ingredient['name'] = item.name
         }
         return ingredient
       })
      })  
    })
    return ingredientNames
   }
}

export default Cookbook;
