import { expect } from 'chai';
const chai = require('chai')
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
  
    it('should have a parameter of user data', function() {
      expect(userRepository.userData).to.equal(users);
    });
  
    it('should not require a property to create a new User Repository', function () {
      let userRepository = new UserRepository();
      expect(userRepository.userData).to.equal(undefined);
    });
  
    it('should log an error if no user data is passed in', function() {
      userRepository = new UserRepository();
      expect(userRepository.data).to.equal(undefined)
    });
});