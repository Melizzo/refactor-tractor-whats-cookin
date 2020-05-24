
// IMPORTS
import './css/base.scss';
import './css/styles.scss';
import Pantry from './pantry';
import Recipe from './recipe';
import User from './user';
import Cookbook from './cookbook';
import UserRepository from './userRepository'

// GLOBALS
let wcUsersData;
let userRepo;
let recipeData;
let ingredientsData;
let user, pantry;
let cookbook 

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

  onStartup(wcUsersData)
})
.catch(error => {
  console.log('Something is amiss with promise all', error)
});

let favButton = document.querySelector('.view-favorites');
let homeButton = document.querySelector('.home')
let cardArea = document.querySelector('.all-cards');
let addedRecipeButton = document.querySelector('.view-recipes-to-cook')
let searchRecipesButton = document.querySelector('.search-button')


cardArea.addEventListener('click', cardButtonConditionals);
homeButton.addEventListener('click', cardButtonConditionals);
favButton.addEventListener('click', viewFavorites);
addedRecipeButton.addEventListener('click', viewRecipesToCook)
searchRecipesButton.addEventListener('click', searchRecipes)


function onStartup(wcUsersData) {
  let randomNum = (Math.floor(Math.random() * 49) + 1)
  // original project method: we updated to new User 
  // let newUser = userData.find(user => {
  //   return user.id === Number(userId);
  // });
  // console.log(wcUsersData);
  
  user = new User(wcUsersData[randomNum].id, wcUsersData[randomNum].name, wcUsersData[randomNum].pantry);
  // console.log(user);
  cookbook = new Cookbook(recipeData);
  pantry = new Pantry(user.pantry)
  populateCards(cookbook.recipes);
  console.log(cookbook.recipes);
  greetUser();
}

function viewFavorites() {
  if (cardArea.classList.contains('all')) {
    cardArea.classList.remove('all')
  }
  if (!user.favoriteRecipes.length) {
    favButton.innerHTML = 'You have no favorites!';
    populateCards(cookbook.recipes);
    return
  } else {
    favButton.innerHTML = 'Refresh Favorites'
    cardArea.innerHTML = '';
    user.favoriteRecipes.forEach(recipe => {
      let recipeToCook = recipe.isRecipeToCook ? "-" : "+"
      cardArea.insertAdjacentHTML('afterbegin', `<div id='${recipe.id}'
      class='card'>
      <header id='${recipe.id}' class='card-header'>
      <label for='add-button' class='hidden'>Click to add recipe</label>
      <button id='${recipe.id}' aria-label='add-button' class='add-button card-button'>
      ${recipeToCook}
      </button>
      <label for='favorite-button' class='hidden'>Click to favorite recipe
      </label>
      <button id='${recipe.id}' aria-label='favorite-button' class='favorite favorite-active card-button'>
      </button></header>
      <span id='${recipe.id}' class='recipe-name'>${recipe.name}</span>
      <img id='${recipe.id}' tabindex='0' class='card-picture'
      src='${recipe.image}' alt='Food from recipe'>
      </div>`)
    })
  }
}

function viewRecipesToCook() {
  //we have to figure out how to execute a conditional
  //that will execute if the favorite button contains favorite-active
  //try it in a method
  console.log('hello')
  if (cardArea.classList.contains('all')) {
    cardArea.classList.remove('all')
  }
  if (!user.recipesToCook.length) {
    addedRecipeButton.innerHTML = 'You have no Recipes To Cook!';
    populateCards(cookbook.recipes);
    return
  } else {
    addedRecipeButton.innerHTML = 'Refresh Recipes To Cook'
    cardArea.innerHTML = '';
    user.recipesToCook.forEach(recipe => {
      let favorited = recipe.isFavorite ? "favorite-active" : ""
      let recipeToCook = recipe.isRecipeToCook ? "-" : "+"
      console.log(recipe)
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

function greetUser() {
  const userName = document.querySelector('.user-name');
  userName.innerHTML =
  user.name.split(' ')[0] + ' ' + user.name.split(' ')[1][0];
}

function favoriteCard(event) {
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
}

function recipesToCookCard(event) {
  let specificRecipe = cookbook.recipes.find(recipe => {
    if (recipe.id  === Number(event.target.id)) {
      return recipe;
    }
  })
  
 
  if (event.target.innerText === '+') {
    event.target.innerText = "-";
    user.addToRecipesToCook(specificRecipe);
    console.log(user.recipesToCook)
    return
  }
  //checking if recipe is recipeToCook --
  //
  if (event.target.innerText !== '+') {
    event.target.innerText = "+"
    addedRecipeButton.innerHTML = 'View Recipes To Cook';
    user.removeFromRecipesToCook(specificRecipe)
    console.log(user.recipesToCook)
    return
  } 
}

function cardButtonConditionals(event) {
  
  if (event.target.classList.contains('add-button')) {
    recipesToCookCard(event);
  } 

  if (event.target.classList.contains('favorite')) {
    favoriteCard(event);
  }
  
  if (event.target.classList.contains('home')) {
    addedRecipeButton.innerHTML = 'Recipes To Cook'; // have to do equivelant for recipesToCook
    favButton.innerHTML = 'View Favorites'; // have to do equivelant for recipesToCook
    populateCards(cookbook.recipes);
  }

 else if (event.target.classList.contains('card-picture')) {
    displayDirections(event);
  } 
}

//This is going to need a listner, currently is reacting to other card button conditional -- or need to re phrase
// original card button conditional



function displayDirections(event) {
  let newRecipeInfo = cookbook.recipes.find(recipe => {
    if (recipe.id === Number(event.target.id)) {
      return recipe;
    }
  })
  let recipeObject = new Recipe(newRecipeInfo, ingredientsData);
  let cost = recipeObject.calculateCost()
  let costInDollars = (cost / 100).toFixed(2)
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
}

function getFavorites() {
  if (user.favoriteRecipes.length) {
    user.favoriteRecipes.forEach(recipe => {
      document.querySelector(`.favorite${recipe.id}`).classList.add('favorite-active')
    })
  } else return
}

function populateCards(recipes) {
  cardArea.innerHTML = '';
  if (cardArea.classList.contains('all')) {
    cardArea.classList.remove('all')
  }
  recipes.forEach(recipe => {
    let recipeToCook = recipe.isRecipeToCook ? "-" : "+"
    cardArea.insertAdjacentHTML('afterbegin', `<div id='${recipe.id}'
    class='card'>
        <header id='${recipe.id}' class='card-header'>
          <label for='add-button' class='hidden'>Click to add recipe</label>
          <button id='${recipe.id}' aria-label='add-button' class='add-button card-button'>
            ${recipeToCook}
          </button>
          <label for='favorite-button' class='hidden'>Click to favorite recipe
          </label>
          <button id='${recipe.id}' aria-label='favorite-button' class='favorite favorite${recipe.id} card-button'></button>
        </header>
          <span id='${recipe.id}' class='recipe-name'>${recipe.name}</span>
          <img id='${recipe.id}' tabindex='0' class='card-picture'
          src='${recipe.image}' alt='click to view recipe for ${recipe.name}'>
    </div>`)
  })
  getFavorites();
};

function searchRecipes() {
  // debugger
  cardArea.innerHTML = '';
  let searchInput = document.querySelector('.search-input')
  const searchedRecipesArray = [];
  for (let i = 0; i < cookbook.recipes.length; i++) {
    if (cookbook.recipes[i].name.includes(searchInput.value) || cookbook.recipes[i].ingredients.includes(searchInput.value)) {
      console.log('We got this')
      searchedRecipesArray.push(cookbook.recipes[i]);
    }
  }
  return searchInput.value ? populateCards(searchedRecipesArray) : populateCards(cookbook.recipes);
 }
