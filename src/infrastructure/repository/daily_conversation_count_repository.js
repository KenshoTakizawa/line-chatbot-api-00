import DailyConversationCount from '../../models/daily_conversation_count.js';

export class DailyConversationCountRepository {
    async findOneByUserAndDate(userId, date) {
        try {
            const count = await DailyConversationCount.findOne({
                where: {
                    userId: userId,
                    date: date
                }
            });

            if (count) {
                console.log('Daily conversation count found:', count);
                return count;
            } else {
                console.log('Daily conversation count not found');
                return null;
            }
        } catch (error) {
            console.error('Error finding daily conversation count:', error);
            throw error;
        }
    }

    async create(userId, date, count) {
        try {
            const dailyCount = await DailyConversationCount.create({
                userId: userId,
                date: date,
                count: count
            });

            console.log('Successfully created daily conversation count:', dailyCount);
            return dailyCount;
        } catch (error) {
            console.error('Error creating daily conversation count:', error);
            throw error;
        }
    }

    async save(dailyCount) {
        try {
            await dailyCount.save();
            console.log('Successfully saved daily conversation count:', dailyCount);
            return dailyCount;
        } catch (error) {
            console.error('Error saving daily conversation count:', error);
            throw error;
        }
    }

    async incrementCount(userId, date) {
        try {
            const [dailyCount, created] = await DailyConversationCount.findOrCreate({
                where: { userId: userId, date: date },
                defaults: { count: 0 }
            });

            dailyCount.setCount(dailyCount.getCount() + 1);
            await dailyCount.save();

            console.log('Successfully incremented daily conversation count:', dailyCount);
            return dailyCount;
        } catch (error) {
            console.error('Error incrementing daily conversation count:', error);
            throw error;
        }
    }
}