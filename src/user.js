class User {
  constructor(id, name, pantry) {
    this.id = id === Number(id) ? id : undefined;
    this.name = name ? name : undefined;
    this.pantry = pantry instanceof Array ? pantry : undefined;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
  }

  addToFavorites(recipe) {
    if (!this.favoriteRecipes.includes(recipe)) {
      recipe.isFavorite = true;
      this.favoriteRecipes.push(recipe)
    }
  }

  addToRecipesToCook(recipe) {
    if (!this.recipesToCook.includes(recipe)) {
      recipe.isRecipeToCook = true;
      this.recipesToCook.push(recipe)
    }
  }

  removeFromFavorites(recipe) {
    const i = this.favoriteRecipes.indexOf(recipe);
    recipe.isFavorite = false;
    this.favoriteRecipes.splice(i, 1)
  }

  removeFromRecipesToCook(recipe) {
    const i = this.recipesToCook.indexOf(recipe);
    recipe.isRecipeToCook = false;
    this.recipesToCook.splice(i, 1)
  }

  filterFavorites(tag) {
    return this.favoriteRecipes.filter(recipe => {
      return recipe.tags.includes(tag);
    });
  }

  findFavorites(strgToSrch) {
    return this.favoriteRecipes.filter(recipe => {
      return recipe.name.includes(strgToSrch)
      || recipe.ingredients.find(ingredient => {
        return ingredient.name.includes(strgToSrch)
      });
    });
  }
}


export default User;
