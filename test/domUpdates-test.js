/* eslint-disable max-len */
const chai = require('chai');
const expect = chai.expect;
const spies = require("chai-spies");
chai.use(spies);


import users from '../src/data/users.js'
import recipeData from '../src/data/recipes.js'
import Recipe from '../src/recipe';
import Cookbook from '../src/cookbook';
import DomUpdates from '../src/domUpdates';
import User from '../src/user';

describe('DomUpdates', function() {
  let domUpdates;
  let cookbook;
  let recipe;
  let user;
    
  beforeEach(() => {
    
    domUpdates = new DomUpdates()
    chai.spy.on(domUpdates, "viewFavorites", () => {});
    chai.spy.on(domUpdates, "viewRecipesToCook", () => {});
    chai.spy.on(domUpdates, "greetUser", () => {});
    chai.spy.on(domUpdates, "favoriteCard", () => {});
    chai.spy.on(domUpdates, "recipesToCookCard", () => {});
    chai.spy.on(domUpdates, "displayDirections", () => {});
    chai.spy.on(domUpdates, "ingredientsPurchaseDropDown", () => {});
    chai.spy.on(domUpdates, "populateCards", () => {});
    chai.spy.on(domUpdates, "fsearchRecipes", () => {});
    chai.spy.on(domUpdates, "filterRecipesByTag", () => {});

    cookbook = new Cookbook(recipeData)
    recipe = new Recipe()
    user = new User(users[0].id, users[0].name, users[0].pantry)
   
  })


  it('should be a function', function() {
    expect(DomUpdates).to.be.a('function');
  });

  it('should be an instance of DomUpdates', function() {
    expect(domUpdates).to.be.an.instanceof(DomUpdates);
  });

  it('should be able to view favorite recipes on DOM', function() {
    
    domUpdates.viewFavorites()
    expect(domUpdates.viewFavorites).to.have.been.called(1);

    domUpdates.viewFavorites(user, cookbook)
    expect(domUpdates.viewFavorites).to.have.been.called.with(user);
  });

  it('should be able to view recipes to cook on DOM', function() {
    let area = 'area'
    let button  = 'button'
    
    domUpdates.viewRecipesToCook()
    expect(domUpdates.viewRecipesToCook).to.have.been.called(1);
    
    domUpdates.viewRecipesToCook(user, area, button, cookbook)
    expect(domUpdates.viewRecipesToCook).to.have.been.called(2);
    expect(domUpdates.viewRecipesToCook).to.have.been.called.with(user, area, button, cookbook);
  });

  it('should be able to greet user on the DOM', function() {
    
    domUpdates.greetUser()
    expect(domUpdates.greetUser).to.have.been.called(1);

    domUpdates.greetUser(user)
    expect(domUpdates.greetUser).to.have.been.called(2);
    expect(domUpdates.greetUser).to.have.been.called.with(user);
  });

  it('should be able to favorite a card on the DOM', function() {
    let event = 'event'
    let button  = 'button'
    
    domUpdates.favoriteCard()
    expect(domUpdates.favoriteCard).to.have.been.called(1);

    domUpdates.favoriteCard(event, user, cookbook, button)
    expect(domUpdates.favoriteCard).to.have.been.called(2);
    expect(domUpdates.favoriteCard).to.have.been.called.with(event, user, cookbook, button);
  });

  it('should be able to add a recipe to recipes to cook on the DOM', function() {
    let id = 'id'
    let button  = 'button'
    
    domUpdates.recipesToCookCard()
    expect(domUpdates.recipesToCookCard).to.have.been.called(1);

    domUpdates.recipesToCookCard(user, cookbook, id, button)
    expect(domUpdates.recipesToCookCard).to.have.been.called(2);
    expect(domUpdates.recipesToCookCard).to.have.been.called.with(user, cookbook, id, button);
  });
});