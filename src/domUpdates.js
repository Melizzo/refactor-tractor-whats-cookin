/* eslint-disable max-len */
import Recipe from './recipe';


class DomUpdates {
  constructor() {

  }

  viewFavorites(user, cookbook, area, button) {
    if (area.classList.contains('all')) {
      area.classList.remove('all')
    }
    if (!user.favoriteRecipes.length) {
      button.innerHTML = 'You have no favorites!';
      this.populateCards(cookbook.recipes, area);
      return
    } else {
      button.innerHTML = 'Refresh Favorites'
      area.innerHTML = '';
      this.createRecipeCards(user.favoriteRecipes, area)
    }
  }
    
  viewRecipesToCook(user, area, button, cookbook) {
    if (area.classList.contains('all')) {
      area.classList.remove('all')
    }
    if (!user.recipesToCook.length) {
      button.innerHTML = 'You have no Recipes To Cook!';
      this.populateCards(cookbook.recipes, area);//not getting these recipes
      return
    } else {
      button.innerHTML = 'Refresh Recipes To Cook'
      area.innerHTML = '';
      this.createRecipeCards(user.recipesToCook, area)
    }
  }
    
  greetUser(user) {
    const userName = document.querySelector('.user-name');
    userName.innerHTML =
        user.name.split(' ')[0] + ' ' + user.name.split(' ')[1][0];
  }
    
  favoriteCard(event, user, cookbook, button) {
    let specificRecipe = cookbook.recipes.find(recipe => {
      if (recipe.id  === Number(event.target.id)) {
        return recipe;
      }
    })
    if (!event.target.classList.contains('favorite-active')) {
      event.target.classList.add('favorite-active');
      button.innerHTML = 'View Favorites';
      user.addToFavorites(specificRecipe);
    } else if (event.target.classList.contains('favorite-active')) {
      event.target.classList.remove('favorite-active');
      user.removeFromFavorites(specificRecipe)
    }
  }
    
  recipesToCookCard(user, cookbook, id, button) {
    let specificRecipe = cookbook.recipes.find(recipe => {
      if (recipe.id  === Number(id)) {
        return recipe;
      }
    })
        
    if (event.target.innerText === '+') {
      event.target.innerText = "-";
      user.addToRecipesToCook(specificRecipe);
      return
    }
        
    if (event.target.innerText !== '+') {
      event.target.innerText = "+"
      button.innerHTML = 'View Recipes To Cook';
      user.removeFromRecipesToCook(specificRecipe)
      return
    } 
  }

    
  displayDirections(event, cookbook, ingredientsData, pantry, area) {
    let newRecipeInfo = cookbook.recipes.find(recipe => {
      if (recipe.id === Number(event.target.id)) {
        return recipe;
      }
    })    
    let recipeObject = new Recipe(newRecipeInfo, ingredientsData);        
    let cost = recipeObject.calculateCost()
    let costInDollars = (cost / 100).toFixed(2)
    const allMissingIngredients = pantry.returnCombinedArrays(recipeObject.ingredients)
    area.classList.add('all');
    area.innerHTML = `<h3>${recipeObject.name}</h3>
    <p class='all-recipe-info'>
    <strong>It will cost: </strong><span class='cost recipe-info'>
    $${costInDollars}</span><br><br>
    <strong>You will need: </strong><span class='ingredients recipe-info'></span>
    <strong>You are missing:</strong><span class='missing-ingredients'></span><br>
    <div class='div'><label for='ingredients-dropdown'>Ingredients menu drop down:</label>
    <select id='ingredients-dropdown' type ='search' class="ingredients-menu"></select><br>
    <label for='number-dropdown'>Numbers drop down:</label>
    <input type='number' id='number-input' class='number-dropdown' required min='0' max='24'></input>
    <button type='button' name='button' class='ingredients-button'>Purchase</button>
    <button type='button' name='cooked-button' id="${recipeObject.id}"class='recipe-cooked-button'>I've cooked this recipe!</button>
    </div>
    <br>
    <strong>Instructions: </strong><ol><span class='instructions recipe-info'>
    </span></ol>
    </p>`;
    let ingredientsSpan = document.querySelector('.ingredients');
    const missingIngredientsSpan = document.querySelector('.missing-ingredients')
    let instructionsSpan = document.querySelector('.instructions');
    recipeObject.ingredients.forEach(ingredient => {
      ingredientsSpan.insertAdjacentHTML('afterbegin', `<ul><li>
        ${ingredient.quantity.amount.toFixed(2)} ${ingredient.quantity.unit}
        ${ingredient.name}</li></ul>
        `)
    })
    allMissingIngredients.forEach(ingredient => {
      missingIngredientsSpan.insertAdjacentHTML('afterbegin', `<ul><li>
        ${ingredient.quantity.amount.toFixed(2)} ${ingredient.quantity.unit}
        ${ingredient.name}</li></ul>
        `)
    })
    recipeObject.instructions.forEach(instruction => {
      instructionsSpan.insertAdjacentHTML('beforebegin', `<li>
        ${instruction.instruction}</li>
        `)
    })
    this.ingredientsPurchaseDropDown(allMissingIngredients)
  }

  ingredientsPurchaseDropDown(allMissingIngredients) {
    const ingredientsMenu = document.querySelector('.ingredients-menu')
    allMissingIngredients.forEach(ingredient => {
      ingredientsMenu.insertAdjacentHTML('beforeend', `
      <option value="${ingredient.id}" class='ingredient-tags'>
          ${ingredient.name}
        </option>`)})
  }


  populateCards(recipes, area) {
    area.innerHTML = '';
    if (area.classList.contains('all')) {
      area.classList.remove('all')
    }
    this.createRecipeCards(recipes, area)
  }

  searchRecipes(cookbook, area) {
    area.innerHTML = '';
    let searchInput = document.querySelector('.search-input')
    const searchedRecipesArray = [];
    for (let i = 0; i < cookbook.recipes.length; i++) {
      const lowercaseSearchQuery = searchInput.value.toLowerCase();
      if (cookbook.recipes[i].name.toLowerCase().includes(lowercaseSearchQuery) || cookbook.recipes[i].ingredients.find(ingredient => ingredient.name.toLowerCase() === lowercaseSearchQuery)) {
        searchedRecipesArray.push(cookbook.recipes[i]);
      } 
    }
    if(searchInput.value && searchedRecipesArray.length > 0) {
      this.createRecipeCards(searchedRecipesArray, area)
      searchInput.value = ''
    } else {
      area.innerText = `No ${searchInput.value} for you!`
      searchInput.value = ''
    }
  }

  filterRecipesByTag(cookbook, area) {
    area.innerHTML = '';
    const filteredRecipes = [];
    const tagName = event.target.value;
    cookbook.recipes.filter((recipe) => {
      if (recipe.tags.includes(tagName)) {
        filteredRecipes.push(recipe);
      }
    });
    this.createRecipeCards(filteredRecipes, area)
  }

  createRecipeCards(recipeArray, area) {
    recipeArray.forEach(recipe => {
      let favorited = recipe.isFavorite ? "favorite-active" : ""
      let recipeToCook = recipe.isRecipeToCook ? "-" : "+"
      area.insertAdjacentHTML('afterbegin', `<div id='${recipe.id}'
        class='card'>
        <header id='${recipe.id}' class='card-header'>
        <label for='add-button' class='hidden'>Click to add recipe</label>
        <button id='${recipe.id}' aria-label='add-button' class='add-button card-button'>
        ${recipeToCook}</button>
        <label for='favorite-button' class='hidden'>Click to favorite recipe
        </label>
        <button id='${recipe.id}' aria-label='favorite-button' class='favorite ${favorited} card-button'>
        </button></header>
        <span id='${recipe.id}' class='recipe-name'>${recipe.name}</span>
        <img id='${recipe.id}' tabindex='0' class='card-picture'
        src='${recipe.image}' alt='Food from recipe'>
        </div>`)
    })
  } 
}

export default DomUpdates;