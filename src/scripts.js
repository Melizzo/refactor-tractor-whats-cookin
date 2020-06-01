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
    userRepo = new UserRepository(wcUsersData);

    onStartup(wcUsersData, ingredientsData)
    // cookbook.recipesWithNames = cookbook.allPossibleIngredients()
    cookbook.returnIngredientsWithNames(ingredientsData)
  })
  .catch(error => {
    // eslint-disable-next-line no-console
    console.log('Something is amiss with promise all', error)
  });

let favButton = document.querySelector('.view-favorites');
let homeButton = document.querySelector('.home')
let cardArea = document.querySelector('.all-cards');
let addedRecipeButton = document.querySelector('.view-recipes-to-cook')
let searchRecipesButton = document.querySelector('.search-button')
let tagsMenu = document.querySelector('.tags-menu');


cardArea.addEventListener('click', cardButtonConditionals)
homeButton.addEventListener('click', cardButtonConditionals);
favButton.addEventListener('click', viewFavorites);
addedRecipeButton.addEventListener('click', viewRecipesToCook);
searchRecipesButton.addEventListener('click', searchRecipes);
tagsMenu.addEventListener('change', filterRecipesDropdown);

function onStartup(wcUsersData) {
  let randomNum = (Math.floor(Math.random() * 50) - 1)
  // eslint-disable-next-line max-len
  user = new User(wcUsersData[randomNum].id, wcUsersData[randomNum].name, wcUsersData[randomNum].pantry);
  cookbook = new Cookbook(recipeData);
  pantry = new Pantry(user.pantry)
  domUpdates.populateCards(cookbook.recipes);
  domUpdates.greetUser(user);
}
  
function cardButtonConditionals(event) {
  if (event.target.classList.contains('add-button')) {
    domUpdates.recipesToCookCard(user, cookbook, event.target.id);
  } 

  if (event.target.classList.contains('favorite')) {
    domUpdates.favoriteCard(event, user, cookbook);
  }

  if (event.target.classList.contains('home')) {
    addedRecipeButton.innerHTML = 'Recipes To Cook'; // have to do equivelant for recipesToCook
    favButton.innerHTML = 'View Favorites'; // have to do equivelant for recipesToCook
    domUpdates.populateCards(cookbook.recipes);
  }

  if (event.target.classList.contains('ingredients-button')) {
    let ingredientsDropDown = document.querySelector('.ingredients-menu')
    let numberInput = document.getElementById('number-input')
    postNewIngredientsData(ingredientsDropDown.value, numberInput.value)
  } else if (event.target.classList.contains('card-picture')) {
    domUpdates.displayDirections(event, cookbook, ingredientsData, pantry);
  } 
}

function  viewRecipesToCook() {
  domUpdates.viewRecipesToCook(user) 
}

function viewFavorites() {
  domUpdates.viewFavorites(user, cookbook)
}

function searchRecipes() {
  domUpdates.searchRecipes(cookbook)
}

function postNewIngredientsData(ingredientID, quantity) {
  fetch('https://fe-apps.herokuapp.com/api/v1/whats-cookin/1911/users/wcUsersData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "userID": user.id,
      "ingredientID": ingredientID,
      "ingredientModification": quantity
    })
  })
    .then(response => response.json())
    .then((data) => {
      console.log('Success:', data) 
    })
    .catch(err => console.log(err.message));
}


function filterRecipesDropdown() {
  domUpdates.filterRecipesByTag(cookbook)
}


