// import 'source-map-support/register';
import {Responder} from '../lib/responder.js';
import {UserRepository} from '../../infrastructure/repository/user_repository.js';
import {DailyConversationCountRepository} from '../../infrastructure/repository/daily_conversation_count_repository.js';
import sequelize from "../../database.js";
import {UserSubscriptionRepository} from "../../infrastructure/repository/user_subscription_repository.js";

const res = new Responder();

export const handler = async (event) => {
    try {
        await sequelize.authenticate();
        const userRepository = new UserRepository();
        const dailyCountRepository = new DailyConversationCountRepository();
        const userSubscriptionRepository = new UserSubscriptionRepository();

        const lineUserId = event.pathParameters ? event.pathParameters.lineUserId : null;

        if (!lineUserId) {
            return res.response('User ID cannot be found.', 400);
        }

        const aiId = event.pathParameters ? event.pathParameters.aiId : null;

        if (aiId === null) {
            return res.doNotExistBodyElement('No ai id provided.', 400);
        }

        let user = await userRepository.getUserBylineUserId(lineUserId);

        // TODO: 関係値レベルの機能を実装するタイミングで、それらの依存関係を考える
        if (!user) {
            user = await userRepository.createUser(lineUserId);
            // const relationTypeId = 1;
            // const relationType = await relationTypeRepository.getTypeById(relationTypeId);
            // const relationLevel = await relationLevelRepository.createInitialRelationLevel(user.getId(), ai.getId());
            console.log('New user created:', user);
            // console.log('New relation level:', relationLevel);
        }

        const date = new Date();
        date.setHours(0, 0, 0, 0);

        const dailyCount = await dailyCountRepository.findOneByUserAiAndDate(user.getId(), Number(aiId), date);

        const count = dailyCount ? dailyCount.getCount() : 0;

        const userSubscription = await userSubscriptionRepository.findOneByUserAndAi(user.getId(), Number(aiId));

        return res.response(
            {
                dailyCount: count,
                subscription: userSubscription,
            }, 200);

    } catch (error) {
        console.error('Error in handler:', error);
        return res.response('Internal server error', 500);
    }
};
