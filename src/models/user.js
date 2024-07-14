import {Model, DataTypes} from "sequelize";
import {sequelize} from "../database.js";
import RelationType from "./relation_type.js";

class User extends Model {
    getId() {
        return this.getDataValue('id');
    }

    setId(value) {
        this.setDataValue('id', value);
    }

    getLineUserId() {
        return this.getDataValue('lineUserId');
    }

    setLineUserId(value) {
        this.setDataValue('lineUserId', value);
    }
}

User.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true,
    }, lineUserId: {
        type: DataTypes.STRING(255), allowNull: false,
    },
}, {
    tableName: 'users', sequelize,
});

export default User;