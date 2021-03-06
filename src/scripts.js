/* eslint-disable max-len */

// IMPORTS
import './css/_variables.scss';
import './css/index.scss';
import Pantry from './pantry';
import Recipe from './recipe';
import User from './user';
import Cookbook from './cookbook';
import UserRepository from './userRepository'
import DomUpdates from './domUpdates'

// GLOBALS
let wcUsersData;
let userRepo;
let recipeData;
let ingredientsData;
let user, pantry;
let cookbook;
const domUpdates = new DomUpdates()

// Fetching
wcUsersData = fetch('https://fe-apps.herokuapp.com/api/v1/whats-cookin/1911/users/wcUsersData')
  .then(data => data.json())
  .then(data => data.wcUsersData)
  .catch(err => console.log(err.message))

ingredientsData = fetch('https://fe-apps.herokuapp.com/api/v1/whats-cookin/1911/ingredients/ingredientsData')
  .then(data => data.json())
  .then(data => data.ingredientsData)
  .catch(err => console.log(err.message))

recipeData = fetch('https://fe-apps.herokuapp.com/api/v1/whats-cookin/1911/recipes/recipeData')
  .then(data => data.json())
  .then(data => data.recipeData)
  .catch(err => console.log(err.message))


//PROMISE
Promise.all([wcUsersData, ingredientsData, recipeData])
  .then(data => {
    wcUsersData = data[0];
    ingredientsData = data[1]
    recipeData = data[2]
  })
  .then(() => {
    onStartup(wcUsersData, ingredientsData)
    cookbook.returnIngredientsWithNames(ingredientsData)
  })
  .catch(error => {
    console.log('Something is amiss with promise all', error)
  });

  // Query Selectors
let favButton = document.querySelector('.view-favorites');
let homeButton = document.querySelector('.home')
let cardArea = document.querySelector('.all-cards');
let addedRecipeButton = document.querySelector('.view-recipes-to-cook')
let searchRecipesButton = document.querySelector('.search-button')
let tagsMenu = document.querySelector('.tags-menu');

// Event Listeners
cardArea.addEventListener('click', cardButtonConditionals)
homeButton.addEventListener('click', cardButtonConditionals);
favButton.addEventListener('click', viewFavorites);
addedRecipeButton.addEventListener('click', viewRecipesToCook);
searchRecipesButton.addEventListener('click', searchRecipes);
tagsMenu.addEventListener('change', filterRecipesDropdown);

// Functions
function onStartup(wcUsersData) {
  // Ability to do random onLoad:
  let randomNum = (Math.floor(Math.random() * 50) - 1)
  user = new User(wcUsersData[randomNum].id, wcUsersData[randomNum].name, wcUsersData[randomNum].pantry);
  cookbook = new Cookbook(recipeData);
  pantry = new Pantry(user.pantry)
  domUpdates.populateCards(cookbook.recipes, cardArea);
  domUpdates.greetUser(user);
}
  
function cardButtonConditionals(event) {
  if (event.target.classList.contains('add-button')) {
    domUpdates.recipesToCookCard(user, cookbook, event.target.id, addedRecipeButton);
  } 
  if (event.target.classList.contains('favorite')) {
    domUpdates.favoriteCard(event, user, cookbook, favButton);
  }
  if (event.target.classList.contains('home')) {
    addedRecipeButton.innerHTML = 'Recipes To Cook';
    favButton.innerHTML = 'View Favorites'; 
    domUpdates.populateCards(cookbook.recipes, cardArea);
  }
  if (event.target.classList.contains('ingredients-button')) {
    let ingredientsDropDown = document.querySelector('.ingredients-menu')
    let numberInput = document.getElementById('number-input')
    postNewIngredientsData(ingredientsDropDown.value, numberInput.value)
    domUpdates.displayDirections(event.target.id, cookbook, ingredientsData, pantry, cardArea)
  } 
  if(event.target.classList.contains('recipe-cooked-button')) {
    const currentRecipe = findCurrentRecipe(event.target.id)
    postUsedIngredientsData(currentRecipe);
  }
  else if (event.target.classList.contains('card-picture')) {
    domUpdates.displayDirections(event.target.id, cookbook, ingredientsData, pantry, cardArea);
  } 
}

function findCurrentRecipe(id){
 return recipeData.find(recipe => recipe.id == id)
}

function  viewRecipesToCook() {
  domUpdates.viewRecipesToCook(user, cardArea, addedRecipeButton, cookbook) 
}

function viewFavorites() {
  domUpdates.viewFavorites(user, cookbook, cardArea, favButton)
}

function searchRecipes() {
  domUpdates.searchRecipes(cookbook, cardArea)
}
// Post
function postNewIngredientsData(ingredientID, quantity) {
  fetch('https://fe-apps.herokuapp.com/api/v1/whats-cookin/1911/users/wcUsersData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "userID": user.id,
      "ingredientID": Number(ingredientID),
      "ingredientModification": Number(quantity)
    })
  })
    .then(response => response.json())
    .then((data) => {
    console.log('Success:', data) 
    refreshUserPantry(ingredientID, quantity);
    })
    .catch(err => console.log(err.message));
}

function refreshUserPantry(ingredientID, quantity) {
  user.pantry.forEach(ingredient => {
    if(ingredient.ingredient == Number(ingredientID)) {
      ingredient.amount += Number(quantity)
    }
  }) 
  if(!user.pantry.includes(Number(ingredientID))) {
    user.pantry.push({"ingredient": Number(ingredientID), "amount": Number(quantity)})
  }
}

function postUsedIngredientsData(currentRecipe) {
  if(pantry.returnCombinedArrays(currentRecipe.ingredients).length === 0) {
    currentRecipe.ingredients.forEach(ingredient => {
      fetch('https://fe-apps.herokuapp.com/api/v1/whats-cookin/1911/users/wcUsersData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "userID": user.id,
          "ingredientID": ingredient.id,
          "ingredientModification": -Math.abs(ingredient.quantity.amount)
        })
      })
        .then(response => response.json())
        .then((data) => {
          console.log('Success:', data) 
        })
        .catch(err => console.log(err.message));
    })
    const errorMsg = document.getElementById('cooked-error');
    errorMsg.innerText = `You can cook the item!`
  } 
  else {
    const errorMsg = document.getElementById('cooked-error');
    errorMsg.innerText = `Please purchase more items to cook the recipe`
  }
}

function filterRecipesDropdown() {
  domUpdates.filterRecipesByTag(cookbook, cardArea)
}


