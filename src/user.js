class User {
    constructor(id, username, password) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.friends = new Set();
    }

    addFriend(user) {
        this.friends.add(user);
        user.friends.add(this);
    }
}

export { User }