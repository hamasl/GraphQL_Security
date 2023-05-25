import { User } from "./user.js";
import randomstring from "randomstring";
import { ENV } from "./envVars.js";

// Mock user repos as an array living in the local memory
const userRepo = [];

/**
 * Generates NUM_OF_USERS users.
 *
 * ID: starts at 1 and increment, last user has ID = NUM_OF_USERS.
 * Username: is set as "user+id", menaing user with ID 1 has username: "user1"
 * Password: are generated from the lowercase alphabet,
 * and have a length of GENERATED_PASSWORD_LENGTH
 */
const genUsers = () => {
  for (let i = 0; i < ENV.NUM_OF_USERS; i++) {
    userRepo.push(
      new User(
        i + 1,
        `user${i + 1}`,
        randomstring.generate({
          charset: "alphabetic",
          capitalization: "lowercase",
          length: ENV.GENERATED_PASSWORD_LENGTH,
        })
      )
    );
  }
};

/**
 * Assigns each user NUM_OF_FRIENDS friends per user pseudorandomly
 * However since the friend field is a set duplicates are not allowed,
 * therefore the amount friends per user might vary. E.g.:
 *
 * Let three users be A, B and C.
 * A is assigned B as a friend, B is assigned A as a friend,
 * and C is assigned A as a friend.
 *
 * This results in A having 2 friends (B and C), B having one friend (A),
 * and C having one friend (A).
 */
const genFriendships = () => {
  for (let i = 0; i < userRepo.length; i++) {
    for (let j = 0; j < ENV.NUM_OF_FRIENDS; j++) {
      // Modulo in case it rounds upwards
      let rnd = Math.round(Math.random() * userRepo.length) % userRepo.length;
      // Makes sure not to befriend oneself, wraps around
      // via modulo in case of last person in repo
      if (rnd === i) rnd = (rnd + 1) % userRepo.length;
      userRepo[i].addFriend(userRepo[rnd]);
    }
  }
};

// Actually mocking the users, via running the functions
// Users need to be generated first
genUsers();
genFriendships();

export { userRepo };
