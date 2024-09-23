// import { APIGatewayProxyHandler } from 'aws-lambda';
// import 'source-map-support/register';
// import { User } from '../../entities/user';
// import { Responder } from '../lib/responder'
// import { AppDataSource } from '../data_source';
// import { SubscriptionType, UserSubscription } from '../../entities/user_subscriptions';
// import { SubscriptionTarget } from '../../entities/subscription_targets';
//
// const res = new Responder();
//
// interface Body {
//     subscriptionType: string;
//     aiId: number;
// }
//
// // domain/users/{lineUserId}/subscriptions
// export const handler: APIGatewayProxyHandler = async (event) => {
//     await AppDataSource.initialize();
//     const userRepository = AppDataSource.getRepository(User);
//     const userSubscriptionRepository = AppDataSource.getRepository(UserSubscription);
//     const subscriptionTargetRepository = AppDataSource.getRepository(SubscriptionTarget);
//
//     if (!event.body) {
//         return res.doNotExistBodyElement('No body provided', 400);
//     }
//
//     const body: Body = JSON.parse(event.body);
//
//     const lineUserId = event.pathParameters ? event.pathParameters.lineUserId : null;
//
//     if (!lineUserId) {
//         return res.doNotExistBodyElement('User ID cannot be found.', 400);
//     }
//
//     if (!body.subscriptionType || !(body.subscriptionType in SubscriptionType)) {
//         return res.doNotExistBodyElement('Invalid subscription type provided', 400);
//     }
//
//     if (!body.aiId) {
//         return res.doNotExistBodyElement('No AI ID provided', 400);
//     }
//
//     const subscriptionType = SubscriptionType[body.subscriptionType as keyof typeof SubscriptionType];
//
//     const user = await userRepository.findOne({ where: { lineUserId: lineUserId } });
//     if (!user) {
//         throw new Error('User not found');
//     }
//
//     const target = await subscriptionTargetRepository.findOne({ where: { id: body.aiId } });
//     if (!target) {
//         throw new Error('Subscription target (AI) not found');
//     }
//
//     const expiresAt = subscriptionType === SubscriptionType.PAID
//       ? new Date(new Date().setMonth(new Date().getMonth() + 1))
//       : null;
//
//     const newSubscription = new UserSubscription(0, user.id, target.id, subscriptionType, expiresAt);
//
//     try {
//         await AppDataSource.manager.transaction(async transactionalEntityManager => {
//             await transactionalEntityManager.save(newSubscription);
//         });
//     } catch (e) {
//         console.error('Error saving subscription:', e);
//         return res.errorResponse('Failed to add subscription', 500);
//     }
//
//     return res.normalResponse(
//       JSON.stringify({
//           message: 'User subscription was successfully added',
//           subscription: {
//               id: newSubscription.id,
//               userId: user.id,
//               aiId: target.id,
//               subscriptionType: newSubscription.subscriptionType,
//               expiresAt: newSubscription.expiresAt
//           }
//       }), 200);
// };