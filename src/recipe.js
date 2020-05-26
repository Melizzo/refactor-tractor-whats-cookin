class Recipe {
  constructor(recipe, ingredientsData) {
    this.name = recipe.name;
    this.id = recipe.id;
    this.ingredients = recipe.ingredients;
    this.instructions = recipe.instructions;
    this.tags = recipe.tags;
    this.ingredientsData = ingredientsData;
    this.isFavorite = false;
    this.isRecipeToCook = false;
  }

  searchIngredientsById(ingredientsData) {
   const ingredientNames = this.ingredients.map(ingredient => {
      ingredientsData.find(item => {
        if(ingredient.id === item.id) {
          ingredient['name'] = item.name
        }
      })
      return ingredient
    })
    return ingredientNames
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



/*
<section class="recipes-header">
          







function filterRecipesByTag() {
  allRecipesDisplay.innerHTML = '';
  let filteredRecipes = [];
  let tagName = event.target.value;
  displayedRecipes.filter((recipe) => {
    if (recipe.tags.includes(tagName)) {
      filteredRecipes.push(recipe);
    }
  });

  filteredRecipes.forEach((recipe) => {
    allRecipesDisplay.innerHTML +=
      `<div id=${recipe.id} class='recipe-card'>
        <div class='recipe-card-header'>
          <p>${recipe.name}</p>
          <div class="card-btns">
          <button class='favorite'>F</button>
          <button class='cook-next'>C</button>
        </div>
      </div>
      <div class="recipe-img">
        <img id=${recipe.id} class="card-image"src="${recipe.image}" alt="">
      </div>
      </div>`
  });
}







tagsMenu.addEventListener('change', filterRecipesByTag);




let tagsMenu = document.querySelector('.tags-menu');


*/