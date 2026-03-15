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

    async findUserByExternalId(externalId) {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('external_id', externalId)
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

    async findOrCreateUserByExternalId(externalId, clerkDetails) {
        // 1. Try to find the user by external_id
        const { data: user, error: findError } = await supabase
            .from('users')
            .select('*')
            .eq('external_id', externalId)
            .single();

        if (findError && findError.code !== 'PGRST116') {
            throw new Error(findError.message);
        }

        if (user) {
            // Update role if it has changed in Clerk
            if (user.role !== clerkDetails.role) {
                const { data: updatedUser, error: updateError } = await supabase
                    .from('users')
                    .update({ role: clerkDetails.role })
                    .eq('id', user.id)
                    .select('*')
                    .single();
                
                if (!updateError) return updatedUser;
            }
            return user;
        }

        // 2. If not found, create the user (JIT Provisioning)
        const { data: newUser, error: createError } = await supabase
            .from('users')
            .insert([{
                external_id: externalId,
                name: clerkDetails.name || 'New User',
                email: clerkDetails.email,
                role: clerkDetails.role || 'CUSTOMER'
            }])
            .select('*')
            .single();

        if (createError) {
            throw new Error(createError.message);
        }

        return newUser;
    }
}

module.exports = new UserService();
