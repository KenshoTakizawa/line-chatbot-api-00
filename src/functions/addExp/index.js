import 'reflect-metadata';
import 'source-map-support/register.js';
import {Responder} from '../lib/responder.js';
import {UserRepository} from '../../infrastructure/repository/user_repository.js';
import {AiRepository} from '../../infrastructure/repository/ai_repository.js';
import {RelationTypeRepository} from '../../infrastructure/repository/relation_type_repository.js';
import {RelationLevelRepository} from '../../infrastructure/repository/relation_level_repository.js';
import sequelize from "../../database.js";

// import sequelize from '../../database';
// const AWS = require('aws-lambda');


export const handler = async (event) => {
    const res = new Responder();
    const userRepository = new UserRepository();
    const aiRepository = new AiRepository();
    const relationTypeRepository = new RelationTypeRepository();
    const relationLevelRepository = new RelationLevelRepository();

    if (!event.body) {
        return res.doNotExistBodyElement('No body provided', 400);
    }

    const body = JSON.parse(event.body);
    const lineUserId = event.pathParameters ? event.pathParameters.lineUserId : null;

    if (!lineUserId) {
        return res.doNotExistBodyElement('No user id provided.', 400);
    }

    if (!body.aiId) {
        return res.doNotExistBodyElement('No AI ID provided', 400);
    }

    const transaction = await sequelize.transaction();

    try {
        let user = await userRepository.getUserBylineUserId(lineUserId);
        const ai = await aiRepository.getAiById(body.aiId);

        if (!user) {
            user = await userRepository.createUser(lineUserId);
            // const relationTypeId = 1;
            // const relationType = await relationTypeRepository.getTypeById(relationTypeId);
            const relationLevel = await relationLevelRepository.createInitialRelationLevel(user.getId(), ai.getId());
            console.log('New user created:', user);
            console.log('New relation level:', relationLevel);
        }

        const addExperience = 1;

        await relationLevelRepository.addRelationExperience(user.getId(), ai.getId(), addExperience);

        // TODO: levelアップの仕組みを作成する

        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        console.error(error);
        return res.response('Experience update or create fail', 500);
    }

    // return res.normalResponse(JSON.stringify({
    //     message: 'Experience updated or created successfully',
    //     userId: user.id,
    //     experience: relationLevel.experience,
    //     level: relationLevel.level
    // }), 200);

    return res.response('Experience updated or created successfully', 200);
};