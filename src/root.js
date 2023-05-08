import { userRepo } from "./mockUserRepository.js";
import {ENV} from "./envVars.js"

const root = {
  user: (args) => {
    let answer = userRepo.find((u) => u.id === args.id);
    return answer;
  },
  users: (args) => {
    const first = args.first ?? Number.MAX_SAFE_INTEGER;
    if (first < 0) {
      throw Error(`Limit cannot be less than 0`);
    }
    return userRepo.slice(0, Math.min(first, ENV.USERS_LIMIT));
  },
  /*IMPORTANT: This is a horrible way to do authentication 
    and only done here because it is not the scope of the task
    look up a proper and recent for your language/framework way to do it online*/
  login: (args) => {
    const user = userRepo.find((u) => u.username === args.username);
    if (!user) return false;
    return user.password === args.password;
  },
  /*IMPORTANT: This is a horrible way to do password changing 
  and only done here because it is not the scope of the task
  look up a proper and recent for your language/framework way to do it online*/
  changePassword: (args) => {
    const userIndex = userRepo.findIndex((u) => u.username === args.username);
    console.log(userIndex);
    if (userIndex === -1) return false;
    console.log(JSON.stringify(userRepo[userIndex]))
    userRepo[userIndex].password = args.newPassword;
    return true;
  },
};

export { root };
