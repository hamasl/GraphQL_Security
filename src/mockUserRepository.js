import { User } from "./user.js";
import { adjectives, colors, animals, starWars, languages, uniqueNamesGenerator, NumberDictionary } from "unique-names-generator";
import randomstring from "randomstring"

const NUM_OF_FRIENDS = 1
const NUM_OF_USERS = 100
const PASSWORD_LENGTH = 4

const userRepo = []

const numDic = NumberDictionary.generate({ min: 1, max: 1000 })
const genUsers = () => {
    for (let i = 0; i < NUM_OF_USERS; i++) {
        // Unique name generation taken from: 
        // https://www.npmjs.com/package/unique-names-generator (05.05.23)
        userRepo.push(new User(i + 1, uniqueNamesGenerator({
            dictionaries: [adjectives, colors, animals, starWars, languages, numDic],
            length: 6
        }), randomstring.generate(PASSWORD_LENGTH)))
    }
}
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

genUsers();
genFriendships();


export { userRepo }