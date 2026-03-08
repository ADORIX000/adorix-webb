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

    async updateUser(id, updateData) {
        const userIndex = this.users.findIndex(u => u.id === parseInt(id));
        if (userIndex === -1) {
            return null;
        }

        // Only allow updating specific fields
        const allowedUpdates = {};
        if (updateData.name !== undefined) allowedUpdates.name = updateData.name;
        if (updateData.company !== undefined) allowedUpdates.company = updateData.company;
        if (updateData.phone !== undefined) allowedUpdates.phone = updateData.phone;

        // Merge allowed updates with existing user data
        this.users[userIndex] = {
            ...this.users[userIndex],
            ...allowedUpdates,
            updatedAt: new Date().toISOString()
        };

        return this.users[userIndex];
    }
}

module.exports = new UserService();
