import Ai from "../../models/ai.js"

export class AiRepository {
    async getAiById(id) {
        try {
            const ai = await Ai.findOne({
                where: {
                    id: id
                }
            });

            if (ai) {
                console.log('Ai found:', ai);
                return ai;
            } else {
                console.log('Ai not found');
                return null;
            }
        } catch (error) {
            console.error('Error finding ai:', error);
            throw error;
        }
    }
}
