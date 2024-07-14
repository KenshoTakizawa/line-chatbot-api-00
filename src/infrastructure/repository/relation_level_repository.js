import RelationLevel from "../../models/relation_level.js"
import ai from "../../models/ai.js";

export class RelationLevelRepository {
    async getLevelByUserAndAiId(userId, aiId) {
        try {
            const level = await RelationLevel.findOne({
                where: {
                    userId: userId,
                    aiId: aiId,
                }
            });

            if (level) {
                console.log('Relation level found:', level);
                return level;
            } else {
                console.log('Relation level not found');
                return null;
            }
        } catch (error) {
            console.error('Error finding relation level:', error);
            throw error;
        }
    }

    async createInitialRelationLevel(userId, aiId) {
        console.log('###########################to create params: ', userId, aiId, '##################');
        if (!userId || !aiId) {
            throw new Error('User ID and AI ID must be provided');
        }

        try {
            const initialTypeId = 1;
            const initialLevel = 1;
            const initialExperience = 0;

            const level = await RelationLevel.create({
                userId: userId,
                aiId: aiId,
                typeId: initialTypeId,
                experience: initialExperience,
                level: initialLevel,
            });

            console.log('Successfully created relation level: ', level);
            return level;
        } catch (error) {
            console.error('Error creating initial relation level: ', error);
            throw error;
        }
    }

    async addRelationExperience(userId, aiId, experienceToAdd) {
        try {
            let level = await this.getLevelByUserAndAiId(userId, aiId);

            if (!level) {
                level = await this.createInitialRelationLevel(userId, aiId);
            }

            level.experience += experienceToAdd;
            await level.save();

            console.log('Successfully updated relation level: ', level);
        } catch (error) {
            console.error('Error updating relation level: ', error);
            throw error;
        }
    }
}
