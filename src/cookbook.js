class Cookbook {
  constructor(data, ingredientsData) {
    this.recipes = data;
    this.recipesWithNames = this.addNameToRecipeIngredients(ingredientsData)
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
    const ingredientNames = this.recipes.map(recipe => {
      recipe.ingredients.forEach(ingredient => {
        ingredientsData.find(item => {
         if(ingredient.id === item.id) {
           ingredient['name'] = item.name
         }
         return ingredient
       })
      })  
      return ingredientNames
    })
    return recipe
   }
}

export default Cookbook;
