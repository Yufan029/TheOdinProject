class UsersStorage {
    constructor() {
        this.storage = {};
        this.id = 0;
    }

    addUser({ firstName, lastName, age, email, bio }) {
        const id =  this.id;
        console.log(age);
        this.storage[this.id] = { id, firstName, lastName, age, email, bio };
        this.id++;
    }

    getUsers() {
        return Object.values(this.storage);
    }

    getUser(id) {
        return this.storage[id];
    }

    updateUser(id, { firstName, lastName, age, email, bio }) {
        this.storage[id] = { id, firstName, lastName, age, email, bio };
    }

    deleteUser(id) {
        delete this.storage[id];
    }
}

// Rather than exporting the class, we can export an instance of the class by instantiating it.
// This ensures only one instance of this class can exist, also known as the "singleton" pattern.
// singleton pattern
module.exports = new UsersStorage();