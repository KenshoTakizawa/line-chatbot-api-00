// import 'source-map-support/register';
import { Responder } from '../lib/responder.js';
import { UserRepository } from '../../infrastructure/repository/user_repository.js';
import { DailyConversationCountRepository } from '../../infrastructure/repository/daily_conversation_count_repository.js';
import sequelize from "../../database.js";

const res = new Responder();

export const handler = async (event) => {
    try {
        await sequelize.authenticate();
        const userRepository = new UserRepository();
        const dailyCountRepository = new DailyConversationCountRepository();

        const lineUserId = event.pathParameters ? event.pathParameters.lineUserId : null;

        if (!lineUserId) {
            return res.response('User ID cannot be found.', 400);
        }

        const user = await userRepository.getUserBylineUserId(lineUserId);
        console.log('user', user);
        if (!user) {
            return res.response({ dailyCount: 0 }, 200);
        }

        const date = new Date();
        date.setHours(0, 0, 0, 0);

        const dailyCount = await dailyCountRepository.findOneByUserAndDate(user.getId(), date);

        const count = dailyCount ? dailyCount.getCount() : 0;

        return res.response(
            {
                dailyCount: count,
            }, 200);

    } catch (error) {
        console.error('Error in handler:', error);
        return res.response('Internal server error', 500);
    }
};
