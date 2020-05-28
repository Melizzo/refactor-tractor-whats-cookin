class Pantry {
  constructor(userIngredients) {
    this.pantry = userIngredients;
    this.neededIngredients = []
  }
 
  // add an array to push in, for ins don't return arrays
  
  findMissingIngredients(recipeIngredients)  {
    let ingredientsWeHave = []; 
    const ingredientsWeNeed = []
    recipeIngredients.forEach(recipeIngredient => {
      this.pantry.forEach(item => { 
        if(item.ingredient === recipeIngredient.id && !ingredientsWeHave.includes(recipeIngredient)){
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

  // findCostOfMissingIngredients() {
  //   const missingItems = this.missingIngredients()
  // }

}

export default Pantry;
