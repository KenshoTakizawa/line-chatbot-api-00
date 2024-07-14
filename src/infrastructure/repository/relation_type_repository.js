import RelationType from "../../models/relation_type.js"

export class RelationTypeRepository {
    async getTypeById(id) {
        try {
            const type = await RelationType.findOne({
                where: {
                    id: id
                }
            });

            if (type) {
                console.log('Relation type found:', type);
                return type;
            } else {
                console.log('Relation type not found');
                return null;
            }
        } catch (error) {
            console.error('Error finding relation type:', error);
            throw error;
        }
    }
}
