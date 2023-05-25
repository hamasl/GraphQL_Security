/**
 * A User which has an ID, username, password and a set of friends
 */
class User {
  constructor(id, username, password) {
    this.id = id;
    this.username = username;
    this.password = password;
    // Set removes duplicates
    this.friends = new Set();
  }
  /**
   * Adds a friend to the current user if they are not the same,
   * makes sure that the friend added, also adds this user as a friend
   * @param {*} user to be added as a friend of this user
   */
  addFriend(user) {
    if (user.id != this.id) {
      this.friends.add(user);
      user.friends.add(this);
    }
  }
}

export { User };
