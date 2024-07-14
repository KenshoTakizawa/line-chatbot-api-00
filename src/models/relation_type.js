import { Model, DataTypes } from "sequelize";
import sequelize from "../database.js";

class RelationType extends Model {
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

RelationType.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'relation_types',
    timestamps: false,
});

export default RelationType;
