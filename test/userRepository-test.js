const chai = require('chai')
import { expect } from 'chai';
import UserRepository from '../src/UserRepository.js'
import users from '../src/data/users.js';


describe('User Repository', function() {

  let userRepository;

  beforeEach(() => {
    userRepository = new UserRepository(users);
  });
    
  it('should be a function', function() {
    expect(UserRepository).to.be.a('function');
  });
  
  it('should be an instance of a User Repository', function() {
    expect(userRepository).to.be.an.instanceof(UserRepository);
  });
  
  it('should be able to hold every user\'s data', function() {
    expect(userRepository.userData).to.be.an('array');
    expect(userRepository.userData[0]).to.deep.equal(users[0])
    expect(userRepository.userData[4].name).to.equal("Buford DuBuque")
  });

  it('should return an error message if there is no user data', function() {
    userRepository = new UserRepository()
    expect(userRepository.userData).to.equal('Error, data for user\'s cannot be found.')
  });

  it('should have a method that determines whether data passed in is an array', function() {
    userRepository = new UserRepository('horse')
    expect(userRepository.checkIfDataIsArray('horse')).to.equal('Error, data for user\'s cannot be found.')
    expect(userRepository.userData).to.equal('Error, data for user\'s cannot be found.')


    const userRepository2 = new UserRepository(users)
    expect(userRepository2.checkIfDataIsArray(users)).to.equal(users)
    expect(userRepository2.userData).to.deep.equal(users)
  });

  it('should be able to return a user based on their id', function() {
    expect(userRepository.findUser).to.be.a('function')
    expect(userRepository.findUser(5)).to.deep.equal(users[4])
  });

  it('should return an error if user id is not a number', function() {
    expect(userRepository.findUser('hat')).to.equal('Sorry, \'hat\' is not a user id.')
  });
});