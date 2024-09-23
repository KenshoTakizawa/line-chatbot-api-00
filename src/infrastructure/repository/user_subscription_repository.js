import UserSubscription from '../../models/user_subscription.js';

export class UserSubscriptionRepository {
    async findOneByUserAndAi(userId, aiId) {
        try {
            const subscription = await UserSubscription.findOne({
                where: {
                    userId: userId,
                    aiId: aiId
                }
            });

            if (subscription) {
                console.log('User subscription found:', subscription);
                return subscription;
            } else {
                console.log('User subscription not found');
                return null;
            }
        } catch (error) {
            console.error('Error finding user subscription:', error);
            throw error;
        }
    }

    async create(userId, aiId, expiresAt) {
        try {
            const subscription = await UserSubscription.create({
                userId: userId,
                aiId: aiId,
                expiresAt: expiresAt
            });

            console.log('Successfully created user subscription:', subscription);
            return subscription;
        } catch (error) {
            console.error('Error creating user subscription:', error);
            throw error;
        }
    }

    async save(subscription) {
        try {
            await subscription.save();
            console.log('Successfully saved user subscription:', subscription);
            return subscription;
        } catch (error) {
            console.error('Error saving user subscription:', error);
            throw error;
        }
    }

    async updateExpiresAt(userId, aiId, newExpiresAt) {
        try {
            const subscription = await this.findOneByUserAndAi(userId, aiId);
            if (subscription) {
                subscription.setExpiresAt(newExpiresAt);
                await subscription.save();
                console.log('Successfully updated subscription expiry:', subscription);
                return subscription;
            } else {
                console.log('Subscription not found for update');
                return null;
            }
        } catch (error) {
            console.error('Error updating subscription expiry:', error);
            throw error;
        }
    }

    async deleteExpiredSubscriptions() {
        try {
            const deletedCount = await UserSubscription.destroy({
                where: {
                    expiresAt: {
                        [Op.lt]: new Date()
                    }
                }
            });
            console.log(`Successfully deleted ${deletedCount} expired subscriptions`);
            return deletedCount;
        } catch (error) {
            console.error('Error deleting expired subscriptions:', error);
            throw error;
        }
    }
}
