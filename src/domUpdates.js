/* eslint-disable max-len */
import Pantry from './pantry';
import Recipe from './recipe';
import User from './user';
import Cookbook from './cookbook';
import UserRepository from './userRepository'

let wcUsersData;
let userRepo;
let recipeData;
let ingredientsData;
let user, pantry;
let cookbook 

let cardArea = document.querySelector('.all-cards');
let addedRecipeButton = document.querySelector('.view-recipes-to-cook')


let domUpdates = {

  viewFavorites() {
    if (cardArea.classList.contains('all')) {
      cardArea.classList.remove('all')
    }
    if (!user.favoriteRecipes.length) {
      favButton.innerHTML = 'You have no favorites!';
      this.populateCards(cookbook.recipes);
      return
    } else {
      favButton.innerHTML = 'Refresh Favorites'
      cardArea.innerHTML = '';
      this.createRecipeCards(user.favoriteRecipes)
    }
  },
      
  viewRecipesToCook() {
    if (cardArea.classList.contains('all')) {
      cardArea.classList.remove('all')
    }
    if (!user.recipesToCook.length) {
      addedRecipeButton.innerHTML = 'You have no Recipes To Cook!';
      this.populateCards(cookbook.recipes);
      return
    } else {
      addedRecipeButton.innerHTML = 'Refresh Recipes To Cook'
      cardArea.innerHTML = '';
      this.createRecipeCards(user.recipesToCook)
    }
  },
      
  greetUser(user) {
    const userName = document.querySelector('.user-name');
    userName.innerHTML =
        user.name.split(' ')[0] + ' ' + user.name.split(' ')[1][0];
  },
      
  favoriteCard(event) {
    let specificRecipe = cookbook.recipes.find(recipe => {
      if (recipe.id  === Number(event.target.id)) {
        return recipe;
      }
    })
    if (!event.target.classList.contains('favorite-active')) {
      event.target.classList.add('favorite-active');
      favButton.innerHTML = 'View Favorites';
      user.addToFavorites(specificRecipe);
    } else if (event.target.classList.contains('favorite-active')) {
      event.target.classList.remove('favorite-active');
      user.removeFromFavorites(specificRecipe)
    }
  },
      
  recipesToCookCard(event) {
    let specificRecipe = cookbook.recipes.find(recipe => {
      if (recipe.id  === Number(event.target.id)) {
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
      addedRecipeButton.innerHTML = 'View Recipes To Cook';
      user.removeFromRecipesToCook(specificRecipe)
      return
    } 
  },
      
  cardButtonConditionals(event) {
    let addButton = document.querySelector('.add-button')
    let favoriteButton = document.querySelector('.favorite')
    let viewFavoritesButton = document.querySelector('.view-favorites')
    let homeButton = document.querySelector('.home')
    let viewRecipesToCookButton = document.querySelector('.view-recipes-to-cook')
    let cardPicture = document.querySelector('.card-picture')

        
    if (event.target.classList.contains(addButton)) {
      this.recipesToCookCard(event);
    } 
      
    if (event.target.classList.contains(favoriteButton)) {
      this.favoriteCard(event);
    }
        
    if (event.target.classList.contains(homeButton)) {
      viewRecipesToCookButton.innerHTML = 'Recipes To Cook'; // have to do equivelant for recipesToCook
      viewFavoritesButton.innerHTML = 'View Favorites'; // have to do equivelant for recipesToCook
      this.populateCards(cookbook.recipes);
    } else if (event.target.classList.contains(cardPicture)) {
      this.displayDirections(event);
    } 
  },
      
  //This is going to need a listner, currently is reacting to other card button conditional -- or need to re phrase
  // original card button conditional
      
      
      
  displayDirections(event) {
    let newRecipeInfo = cookbook.recipes.find(recipe => {
      if (recipe.id === Number(event.target.id)) {
        return recipe;
      }
    })
        
    let recipeObject = new Recipe(newRecipeInfo, ingredientsData);
        
       
    // let cost = recipeObject.calculateCost()
    // let costInDollars = (cost / 100).toFixed(2)
    cardArea.classList.add('all');
    cardArea.innerHTML = `<h3>${recipeObject.name}</h3>
        <p class='all-recipe-info'>
        <strong>It will cost: </strong><span class='cost recipe-info'>
        $${costInDollars}</span><br><br>
        <strong>You will need: </strong><span class='ingredients recipe-info'></span>
        <strong>Instructions: </strong><ol><span class='instructions recipe-info'>
        </span></ol>
        </p>`;
    let ingredientsSpan = document.querySelector('.ingredients');
    let instructionsSpan = document.querySelector('.instructions');
    recipeObject.ingredients.forEach(ingredient => {
      ingredientsSpan.insertAdjacentHTML('afterbegin', `<ul><li>
          ${ingredient.quantity.amount.toFixed(2)} ${ingredient.quantity.unit}
          ${ingredient.name}</li></ul>
          `)
    })
    recipeObject.instructions.forEach(instruction => {
      instructionsSpan.insertAdjacentHTML('beforebegin', `<li>
          ${instruction.instruction}</li>
          `)
    })
    // console.log('user pantry', user.pantry);
    // console.log(recipeObject.ingredients);
        
    // Compare recipeObject.ingredients (line 248) to user.pantry, and find a list of ingredients that are missing
    pantry.returnCombinedArrays(recipeObject.ingredients)
    console.log(pantry.returnCombinedArrays(recipeObject.ingredients));
        
  },
      
  populateCards(recipes) {
    cardArea.innerHTML = '';
    if (cardArea.classList.contains('all')) {
      cardArea.classList.remove('all')
    }
    this.createRecipeCards(recipes)
  },
      
  searchRecipes() {
    cardArea.innerHTML = '';
    let searchInput = document.querySelector('.search-input')
    const searchedRecipesArray = [];
    for (let i = 0; i < cookbook.recipes.length; i++) {
      const lowercaseSearchQuery = searchInput.value.toLowerCase();
      if (cookbook.recipes[i].name.toLowerCase().includes(lowercaseSearchQuery) || cookbook.recipes[i].ingredients.find(ingredient => ingredient.name.toLowerCase() === lowercaseSearchQuery)) {
        searchedRecipesArray.push(cookbook.recipes[i]);
      } 
    }
    if(searchInput.value && searchedRecipesArray.length > 0) {
      this.createRecipeCards(searchedRecipesArray)
      searchInput.value = ''
    } else {
      cardArea.innerText = `No ${searchInput.value} for you!`
      searchInput.value = ''
    }
  },
      
  filterRecipesByTag() {
    cardArea.innerHTML = '';
    const filteredRecipes = [];
    const tagName = event.target.value;
    cookbook.recipes.filter((recipe) => {
      if (recipe.tags.includes(tagName)) {
        filteredRecipes.push(recipe);
      }
    });
    this.createRecipeCards(filteredRecipes)
  },
      
  //move to DOM updates
  createRecipeCards(recipeArray) {
    recipeArray.forEach(recipe => {
      let favorited = recipe.isFavorite ? "favorite-active" : ""
      let recipeToCook = recipe.isRecipeToCook ? "-" : "+"
      cardArea.insertAdjacentHTML('afterbegin', `<div id='${recipe.id}'
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

export default domUpdates;