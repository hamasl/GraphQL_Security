import { userRepo } from "./mockUserRepository.js";
import { ENV } from "./envVars.js";

// Obejct defining the different resolvers for
// the queries and mutations defined in the schema
const root = {
  /**
   * Returns the user from the repo with ID
   * matching to the one sent in the arguments
   * @param {*} args containing an ID
   * @returns a user
   */
  user: (args) => {
    let answer = userRepo.find((u) => u.id === args.id);
    return answer;
  },
  /**
   * Returns users from the repos
   * Optionally limited by the client via the first argument
   * Hard limit set by server via USERS_LIMIT environment variable
   * @param {*} args optionally contains first
   * @returns a list of users
   */
  users: (args) => {
    const first = args.first ?? Number.MAX_SAFE_INTEGER;
    if (first < 0) {
      throw Error(`Limit cannot be less than 0`);
    }
    return userRepo.slice(0, Math.min(first, ENV.USERS_LIMIT));
  },
  /**
   * Logs in a user if it can be found by the username in the repo,
   * and the password in the arguments match
   * with the one stored in the repo.
   *
   * IMPORTANT: This is a horrible way to do authentication
   * and only done here because it is not the scope of the task
   * look up a proper and recent for your language/framework way to do it online
   *
   * @param {*} args contains username and password
   * @returns true if successful, otherwise false
   */
  login: (args) => {
    const user = userRepo.find((u) => u.username === args.username);
    if (!user) return false;
    return user.password === args.password;
  },
  /**
   * Changes a user's password to the one provided by the argument
   * if they can be found by the username.
   *
   * IMPORTANT: This is a horrible way to do password changing
   * and only done here because it is not the scope of the task
   * look up a proper and recent for your language/framework way to do it online
   *
   * @param {*} args contains username and the new password
   * @returns true if successful, otherwise false
   */
  changePassword: (args) => {
    const userIndex = userRepo.findIndex((u) => u.username === args.username);
    if (userIndex === -1) return false;
    userRepo[userIndex].password = args.newPassword;
    return true;
  },
};

export { root };
