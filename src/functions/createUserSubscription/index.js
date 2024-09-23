import 'reflect-metadata';
import 'source-map-support/register.js';
import {Responder} from '../lib/responder.js';
import {UserRepository} from '../../infrastructure/repository/user_repository.js';
import {AiRepository} from '../../infrastructure/repository/ai_repository.js';
import {UserSubscriptionRepository} from '../../infrastructure/repository/user_subscription_repository.js';

const res = new Responder();

// domain/users/{lineUserId}/subscription
export const handler = async (event) => {
    try {
        const userRepository = new UserRepository();
        const aiRepository = new AiRepository();
        const userSubscriptionRepository = new UserSubscriptionRepository();

        if (!event.body) {
            return res.response('No body provided', 400);
        }

        const body = JSON.parse(event.body);

        const lineUserId = event.pathParameters ? event.pathParameters.lineUserId : null;

        if (!lineUserId) {
            return res.response('User ID cannot be found.', 400);
        }

        if (!body.aiId) {
            return res.response('No AI id provided', 400);
        }

        const user = await userRepository.getUserBylineUserId(lineUserId);

        if (!user) {
            return res.response('User not found', 404);
        }

        const ai = await aiRepository.getAiById(body.aiId);

        if (!ai) {
            return res.response('AI not found', 404);
        }

        const existingSubscription = await userSubscriptionRepository.findOneByUserAndAi(user.getId(), ai.getId());

        if (existingSubscription) {
            return res.response('Subscription already exists for this user and AI', 400);
        }

        // 1ヶ月後の日付を計算
        // TODO: 一年分の課金とかもあるから注意が必要
        const oneMonthLater = new Date();
        oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);

        try {
            const newSubscription = await userSubscriptionRepository.create(user.getId(), ai.getId(), oneMonthLater);

            return res.response(
                {
                    message: 'Subscription created successfully',
                    userId: lineUserId,
                    aiId: ai.getId(),
                    expiresAt: newSubscription.getExpiresAt()
                }, 200);
        } catch (e) {
            console.error('Error saving subscription:', e);
            return res.response('Failed to create subscription', 500);
        }
    } catch (error) {
        console.error('Error in handler:', error);
        return res.response('Failed to process request', 500);
    }
};
