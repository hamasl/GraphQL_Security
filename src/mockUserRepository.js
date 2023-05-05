import { User } from "./user.js";

const userRepo = [
    new User(1, "test1", "pass"),
    new User(2, "test2", "pass"),
    new User(3, "test3", "pass"),
    new User(4, "test4", "pass"),
]

userRepo[0].addFriend(userRepo[1])
userRepo[0].addFriend(userRepo[2])
userRepo[2].addFriend(userRepo[3])

export { userRepo }