class Pantry {
  constructor(userIngredients) {
    this.contents = userIngredients;
    this.neededIngredients = []
    // console.log(this.contents);
  }
 
  // add an array to push in, for ins don't return arrays
  compareIngredients(recipeObject) {
    const ingredientsUserHasForRecipe = []
    const userIngredientsNeeded = recipeObject.filter(recipeIngredient => {
      this.contents.find(pantryItem => { 
        if(pantryItem.ingredient === recipeIngredient.id){
          ingredientsUserHasForRecipe.push(recipeIngredient)

          // if the pantry amount is less than the recipeIngredient, return the 
          // difference of amount & cost. 
        } 
        // compare ingredients we do have to recipe
      })
          
    })
    console.log('ingredientsUserHasForRecipe', ingredientsUserHasForRecipe);
    console.log('userPantry', this.contents);
    console.log('userIngredientsNeeded', userIngredientsNeeded);
    return userIngredientsNeeded
  } 
  // push ingredients that we do have into an array, 
// 

  // I want take the recipeObject, and compare it to the pantry
  // I want to see which ingredients are missing
  // if undefined/if object
  // Add conditionals to filter to recipeIngredients and use find to achieve that goal. 
// I want to see which ingredients are less than what is needed
// Then I want to return what ingredients are ultimately missing, or I need to purchase amount & cost.
  // }

}

export default Pantry;
