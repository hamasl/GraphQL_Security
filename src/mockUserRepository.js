import { User } from "./user.js";
import randomstring from "randomstring";
import {ENV} from "./envVars.js"

const userRepo = [];

const genUsers = () => {
  for (let i = 0; i < ENV.NUM_OF_USERS; i++) {
    userRepo.push(
      new User(i + 1, `user${i + 1}`, randomstring.generate(ENV.GENERATED_PASSWORD_LENGTH))
    );
  }
};
/**
 * Generates NUM_OF_FRIENDS of friends per user pseudorandomly
 */
const genFriendships = () => {
  for (let i = 0; i < userRepo.length; i++) {
    for (let j = 0; j < ENV.NUM_OF_FRIENDS; j++) {
      // Modulo in case it rounds upwards
      let rnd = Math.round(Math.random() * userRepo.length) % userRepo.length;
      // Makes sure not to befriend oneself, wraps around in case of last person in repo
      if (rnd === i) rnd = (rnd + 1) % userRepo.length;
      userRepo[i].addFriend(userRepo[rnd]);
    }
  }
};

genUsers();
genFriendships();

export { userRepo };
