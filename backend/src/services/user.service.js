/**
 * In-memory Mock User Storage
 */
class UserService {
    constructor() {
        this.users = [];
        this.currentId = 1;
    }

    async createUser({ name, email, password }) {
        const user = {
            id: this.currentId++,
            name,
            email,
            password, // In a real app, this should be hashed
            createdAt: new Date().toISOString()
        };
        this.users.push(user);
        return user;
    }

    async findUserByEmail(email) {
        return this.users.find(u => u.email === email);
    }

    async findUserById(id) {
        return this.users.find(u => u.id === parseInt(id));
    }
}

module.exports = new UserService();
