import { userRepo } from "./mockUserRepository.js";

const root = {
  user: (args) => {
    console.log(args.id);
    let answer = userRepo.find((u) => u.id === args.id);
    return answer;
  },
  users: (args) => {
    if (args.first && args.first > 0) {
      return userRepo.slice(0, args.first);
    } else if (!args.first) {
      return userRepo;
    }
    throw Error(`Limit cannot be less than 0`);
  },
  /*IMPORTANT: This is a horrible way to do authentication 
    and only done here because it is not the scope of the task
    look up a proper and recent for your language/framework way to do it online*/
  login: (args) => {
    const user = userRepo.find((u) => u.username === args.username);
    if (!user) return false;
    return user.password === args.password;
  },
  changePassword: (args) => {
    const user = userRepo.find((u) => u.username === args.username);
    if (!user) return false;
    user.password = args.password;
  },
};

export { root };
