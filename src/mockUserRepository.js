import { User } from "./user.js";

const NUM_OF_FRIENDS = 1

const userRepo = [
    new User(1, "test1", "pass"),
    new User(2, "test2", "pass"),
    new User(3, "test3", "pass"),
    new User(4, "test4", "pass"),
]

/**
 * Generates NUM_OF_FRIENDS of friends per user pseudorandomly
 */
const genFriendships = () => {
    for (let i = 0; i < userRepo.length; i++) {
        for (let j = 0; j < NUM_OF_FRIENDS; j++) {
            // Modulo in case it rounds upwards
            let rnd = Math.round(Math.random() * userRepo.length) % userRepo.length;
            // Makes sure not to befriend oneself, wraps around in case of last person in repo
            if (rnd === i) rnd = (rnd + 1) % userRepo.length;
            userRepo[i].addFriend(userRepo[rnd])
        }
    }
}

genFriendships()

export { userRepo }