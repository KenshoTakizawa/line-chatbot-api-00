import 'reflect-metadata';
import 'source-map-support/register.js';
import {Responder} from '../lib/responder.js';
import {UserRepository} from '../../infrastructure/repository/user_repository.js';
import {DailyConversationCountRepository} from '../../infrastructure/repository/daily_conversation_count_repository.js';
import sequelize from "../../database.js";


export const handler = async (event) => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
    const res = new Responder();
    const userRepository = new UserRepository();
    const dailyCountRepository = new DailyConversationCountRepository();

    const lineUserId = event.pathParameters ? event.pathParameters.lineUserId : null;

    if (!lineUserId) {
        return res.doNotExistBodyElement('User ID cannot be found.', 400);
    }

    if (!lineUserId) {
        return res.response('User ID cannot be found.', 400);
    }

    const aiId = event.pathParameters ? event.pathParameters.aiId : null;

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

    let dailyCount = await dailyCountRepository.findOneByUserAiAndDate(user.getId(), Number(aiId), date);

    if (dailyCount) {
        dailyCount.setCount(dailyCount.getCount() + 1);
    } else {
        dailyCount = await dailyCountRepository.create(user.getId(), Number(aiId), date, 1);
    }

    await dailyCountRepository.save(dailyCount);

    return res.response(
        {
            count: dailyCount.getCount()
        }, 200);
};