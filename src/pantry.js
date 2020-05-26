class Pantry {
  constructor(userIngredients) {
    this.contents = userIngredients;
    console.log(this.contents);
  }
 
  compareIngredients(recipeObject) {
  // I want take the recipeObject, and compare it to the pantry
      recipeObject.filter(recipeIngredient => {
    // I want to see which ingredients are missing
    this.contents.find(pantryItem => pantryItem.id === recipeIngredient.id)
      // if undefined/if object
      // Add conditionals to filter to recipeIngredients and use find to achieve that goal. 
    })

  } 
// I want to see which ingredients are less than what is needed
// Then I want to return what ingredients are ultimately missing, or I need to purchase amount & cost.
  // }

}

export default Pantry;
