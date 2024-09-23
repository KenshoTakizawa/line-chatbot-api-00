import {Model, DataTypes} from "sequelize";
import {sequelize} from "../database.js";

class RelationLevel extends Model {
    getId() {
        return this.getDataValue('id');
    }

    setId(value) {
        this.setDataValue('id', value);
    }

    getUserId() {
        return this.getDataValue('userId');
    }

    setUserId(value) {
        this.setDataValue('userId', value);
    }

    getAiId() {
        return this.getDataValue('aiId');
    }

    setAiId(value) {
        this.setDataValue('aiId', value);
    }

    getTypeId() {
        return this.getDataValue('typeId');
    }

    setTypeId(value) {
        this.setDataValue('typeId', value);
    }

    getExperience() {
        return Number(this.getDataValue('experience'));
    }

    setExperience(value) {
        this.setDataValue('experience', value);
    }

    getLevel() {
        return this.getDataValue('level');
    }

    setLevel(value) {
        this.setDataValue('level', value);
    }
}

RelationLevel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        aiId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'ais',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        typeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'relation_types',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        experience: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        level: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'relation_levels',
        timestamps: false,
    }
);

RelationLevel.associate = (models) => {
    RelationLevel.belongsTo(models.User, { foreignKey: 'userId' });
    RelationLevel.belongsTo(models.Ai, { foreignKey: 'aiId' });
    RelationLevel.belongsTo(models.RelationType, { foreignKey: 'typeId' });
};

export default RelationLevel;
