import {Model, DataTypes} from "sequelize";
import {sequelize} from "../database.js";
import RelationType from "./relation_type.js";

class Ai extends Model {
    getId() {
        return this.getDataValue('id');
    }

    setId(value) {
        this.setDataValue('id', value);
    }

    getName() {
        return this.getDataValue('name');
    }

    setName(value) {
        this.setDataValue('name', value);
    }
}

Ai.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    },
    {
        tableName: 'ais',
        sequelize,
    }
);

export default Ai;
