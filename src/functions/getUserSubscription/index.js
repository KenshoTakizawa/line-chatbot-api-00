import 'reflect-metadata';
import 'source-map-support/register.js';
import {Responder} from '../lib/responder.js';
import {UserRepository} from '../../infrastructure/repository/user_repository.js';
import {UserSubscriptionRepository} from '../../infrastructure/repository/user_subscription_repository.js';
import sequelize from "../../database.js";

const res = new Responder();

// domain/users/{lineUserId}/subscription/ais/{aiId}
export const handler = async (event) => {
    try {
        await sequelize.authenticate();
        const userRepository = new UserRepository();
        const userSubscriptionRepository = new UserSubscriptionRepository();

        const lineUserId = event.pathParameters ? event.pathParameters.lineUserId : null;

        if (!lineUserId) {
            return res.response('User ID cannot be found.', 400);
        }

        const aiId = event.pathParameters ? event.pathParameters.aiId : null;

        if (!aiId) {
            return res.response('AI ID cannot be found.', 400);
        }

        const user = await userRepository.getUserBylineUserId(lineUserId);
        if (!user) {
            return res.response(
                {
                    userSubscription: undefined,
                }, 200);
        }

        const userSubscription = await userSubscriptionRepository.findOneByUserAndAi(user.getId(), Number(aiId));

        if (!userSubscription) {
            return res.response(
                {
                    userSubscription: undefined,
                }, 200);
        }

        return res.response(
            {
                userSubscription: userSubscription,
            }, 200);
    } catch (error) {
        console.error('Error in handler:', error);
        return res.response('Failed to process request', 500);
    }
};