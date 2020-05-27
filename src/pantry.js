class Pantry {
  constructor(userIngredients) {
    this.pantry = userIngredients;
    this.neededIngredients = []
    // console.log(this.contents);
  }
 
  // add an array to push in, for ins don't return arrays
  findMissingIngredients(recipeObject)  {
    let counter = 0;
    let missingIngredients = [];
    // Breaks at this.user.pantry.forEach when invoking addMealToList in the user class
    recipeObject.forEach(recipeIngredient => {
      this.user.pantry.contents.forEach(pantryItem => {
        if (pantryItem.ingredient === recipeIngredient.id) {
          counter ++;
        } else {
          if (!missingIngredients.includes(recipeIngredient)) {
            missingIngredients.push(recipeIngredient);
          }
        }
      })
    })
    if (counter === recipeIngredients.length) {
      return 'You have the ingredients!';
    }
  }

  findCostofMissingIngredients() {
    const missingItems = this.MissingIngredients()
  }

}

export default Pantry;
