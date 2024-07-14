import 'reflect-metadata';
import 'source-map-support/register.js';
import {Responder} from '../lib/responder.js';
import {UserRepository} from '../../infrastructure/repository/user_repository.js';
import {AiRepository} from '../../infrastructure/repository/ai_repository.js';
import {RelationTypeRepository} from '../../infrastructure/repository/relation_type_repository.js';
import {RelationLevelRepository} from '../../infrastructure/repository/relation_level_repository.js';

const res = new Responder();

/**
 * users/{lineUserId}/relation-level/ais/{aiId}
 */
export const handler = async (event) => {
    const userRepository = new UserRepository();
    const aiRepository = new AiRepository();
    const relationLevelRepository = new RelationLevelRepository();
    const relationTypeRepository = new RelationTypeRepository();

    const lineUserId = event.pathParameters ? event.pathParameters.lineUserId : null;
    if (lineUserId === null) {
        return res.doNotExistBodyElement('No user id provided.', 400);
    }

    const aiId = event.pathParameters ? event.pathParameters.aiId : null;
    if (aiId === null) {
        return res.doNotExistBodyElement('No ai id provided.', 400);
    }

    let user;
    let ai;
    let relationLevel;
    let relationType;

    try {
        user = await userRepository.getUserBylineUserId(lineUserId);
        ai = await aiRepository.getAiById(aiId);
        relationLevel = await relationLevelRepository.getLevelByUserAndAiId(user.getId(), aiId);
        relationType = await relationTypeRepository.getTypeById(relationLevel.getTypeId());
    } catch (error) {
        console.error(error);
        return res.response('Cannot find elements.', 500);
    }

    return res.response({
        lineUserId: user.getLineUserId(),
        aiName: ai.getName(),
        experience: relationLevel.getExperience(),
        level: relationLevel.getLevel(),
        relationType: relationType.getName()
    }, 200);
}