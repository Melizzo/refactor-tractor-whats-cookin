class Pantry {
  constructor(userIngredients) {
    if(userIngredients instanceof Array) {
      this.pantry = userIngredients;
      this.neededIngredients = []
    }
  }
  
  findMissingIngredients(recipeIngredients)  {
    let ingredientsWeHave = []; 
    const ingredientsWeNeed = []
    recipeIngredients.forEach(recipeIngredient => {
      this.pantry.forEach(item => { 
        if (item.ingredient === recipeIngredient.id && !ingredientsWeHave.includes(recipeIngredient)) {
          ingredientsWeHave.push(recipeIngredient)
        }
      }) 
    })
    recipeIngredients.forEach(ingredient => {
      if(!ingredientsWeHave.includes(ingredient)) {
        ingredientsWeNeed.push(ingredient)
      } 
    })
    return ingredientsWeNeed
  }
 
  returnCombinedArrays(recipeIngredients) {
    const missingIngredients = this.findMissingIngredients(recipeIngredients);
    const notEnoughIngredients = this.findIngredientsWeNeedMoreOf(recipeIngredients);
    const totalMissingIngredients = [...missingIngredients,...notEnoughIngredients];
    return totalMissingIngredients
  }

  // findCostOfMissingIngredients() {
  //   
  // }

}

export default Pantry;
