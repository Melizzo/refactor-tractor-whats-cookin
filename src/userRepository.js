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
    if (id === Number(id)) {
      return this.userData.find((user) => user.id === id)
    } else {
      return `Sorry, '${id}' is not a user id.`
    }
  }
}

export default UserRepository;
