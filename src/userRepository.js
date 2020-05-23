class UserRepository {
    constructor(userData) {
    if(userData) {
      this.userData = userData;
      this.users = [];
    }
    }
  }
  export default UserRepository;