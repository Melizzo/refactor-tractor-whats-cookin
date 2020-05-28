class Pantry {
  constructor(userIngredients) {
    if(userIngredients instanceof Array) {
      this.pantry = userIngredients;
      this.neededIngredients = []
    }
  }
  
  findMissingIngredients(recipeIngredients) {
    if(recipeIngredients instanceof Array) {
      let ingredientsWeNeed = [];
        let itemsWeHave = this.pantry.map(item => {
          return item.ingredient;
        })  
        recipeIngredients.forEach(recipeItem => {
          if (!itemsWeHave.includes(recipeItem.id)) {
            ingredientsWeNeed.push(recipeItem);
          }
        })
        return ingredientsWeNeed;
    }
  }

  findIngredientsWeNeedMoreOf(recipeIngredients) {
    if(recipeIngredients instanceof Array) {
      return this.pantry.reduce((ingredients, pantryItem) => {
        recipeIngredients.forEach(recipeItem => {
          if (recipeItem.id === pantryItem.ingredient) {
            if (recipeItem.quantity.amount > pantryItem.amount) {
              ingredients.push({
                id: recipeItem.id,
                quantity: {
                  amount: recipeItem.quantity.amount - pantryItem.amount,
                  unit: recipeItem.quantity.unit
                }
              })
            }
          }
        })
        return ingredients;
      }, [])
    }
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
