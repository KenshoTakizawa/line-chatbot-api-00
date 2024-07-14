import User from '../../models/user.js';

export class UserRepository {
    async getUserBylineUserId(lineUserId) {
        try {
            const user = await User.findOne({
                where: {
                    lineUserId: lineUserId
                }
            });

            if (user) {
                console.log('User found:', user);
                return user;
            } else {
                console.log('User not found');
                return null;
            }
        } catch (error) {
            console.error('Error finding user:', error);
            throw error;
        }
    }

    async createUser(lineUserId) {
        try {
            const user = await User.create({
                lineUserId: lineUserId,
            })

            console.log('Successfully created user: ', user);
            return user;
        } catch (error) {
            console.error('Error finding when creating user: ', error);
            throw error;
        }
    }
}
