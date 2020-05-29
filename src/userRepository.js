/* eslint-disable max-len */
class UserRepository {
  constructor(userData) {
    this.userData = this.checkIfDataIsArray(userData)
    this.users = [];
  }

  checkIfDataIsArray(data) {
    return data instanceof Array ? data : "Error, data for user\'s cannot be found."
  }

  findUser(id) {
    return id === Number(id) ? this.userData.find((user) => user.id === id) : `Sorry, '${id}' is not a user id.`
  }
}

export default UserRepository;
