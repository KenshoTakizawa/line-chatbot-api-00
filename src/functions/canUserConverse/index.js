import 'source-map-support/register';
import { Responder } from '../lib/responder.js';
import { UserRepository } from '../../infrastructure/repository/user_repository.js';
import { UserSubscriptionRepository } from '../../infrastructure/repository/user_subscription_repository.js';
import { DailyConversationCountRepository } from '../../infrastructure/repository/daily_conversation_count_repository.js';
import sequelize from "../../database.js";

const res = new Responder();

export const handler = async (event) => {
    try {
        await sequelize.authenticate();
        const userRepository = new UserRepository();
        const userSubscriptionRepository = new UserSubscriptionRepository();
        const dailyConversationCountRepository = new DailyConversationCountRepository();

        if (!event.body) {
            return res.doNotExistBodyElement('No body provided', 400);
        }

        const lineUserId = event.pathParameters ? event.pathParameters.lineUserId : null;
        const aiId = event.pathParameters ? event.pathParameters.aiId : null;

        if (!lineUserId) {
            return res.doNotExistBodyElement('User ID cannot be found.', 400);
        }

        if (!aiId) {
            return res.doNotExistBodyElement('AI ID cannot be found.', 400);
        }

        const user = await userRepository.getUserBylineUserId(lineUserId);
        if (!user) {
            return res.doNotExistBodyElement('User not found.', 404);
        }

        // ユーザーサブスクリプションの取得
        const subscription = await userSubscriptionRepository.findOneByUserAndAi(user.getId(), aiId);

        if (!subscription) {
            // サブスクリプションがない場合、日々の会話カウントの取得
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const dailyCount = await dailyConversationCountRepository.findOneByUserAndDate(user.getId(), today);
            const count = dailyCount ? dailyCount.getCount() : 0;

            const canUserConverse = count < 5; // 1日5回まで

            return res.normalResponse(
              JSON.stringify({
                  canUserConverse: canUserConverse,
              }), 200);
        }

        // サブスクリプションがある場合、有効期限をチェック
        const now = new Date();
        const isSubscriptionValid = subscription.getExpiresAt() ? new Date(subscription.getExpiresAt()) > now : false;

        return res.normalResponse(
          JSON.stringify({
              canUserConverse: isSubscriptionValid,
          }), 200);

    } catch (error) {
        console.error('Error in handler:', error);
        return res.errorResponse('Failed to process request', 500);
    }
};