const supabase = require('../lib/supabase');
const bcrypt = require('bcryptjs');

class UserService {

    async createUser({ name, email, password }) {
        const hashedPassword = await bcrypt.hash(password, 12);

        const { data, error } = await supabase
            .from('users')
            .insert([{ name, email, password: hashedPassword }])
            .select('id, name, email, created_at')
            .single();

        if (error) {
            throw new Error(error.message);
        }
        return data;
    }

    async findUserByEmail(email) {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (error && error.code !== 'PGRST116') {
            // PGRST116 = row not found, which is fine
            throw new Error(error.message);
        }
        return data || null;
    }

    async findUserById(id) {
        const { data, error } = await supabase
            .from('users')
            .select('id, name, email, created_at')
            .eq('id', id)
            .single();

        if (error && error.code !== 'PGRST116') {
            throw new Error(error.message);
        }
        return data || null;
    }

    async updateUser(id, updateData) {
        const allowedUpdates = {};
        if (updateData.name !== undefined) allowedUpdates.name = updateData.name;
        if (updateData.company !== undefined) allowedUpdates.company = updateData.company;
        if (updateData.phone !== undefined) allowedUpdates.phone = updateData.phone;

        const { data, error } = await supabase
            .from('users')
            .update(allowedUpdates)
            .eq('id', id)
            .select('id, name, email, created_at')
            .single();

        if (error) {
            throw new Error(error.message);
        }
        return data;
    }
}

module.exports = new UserService();
