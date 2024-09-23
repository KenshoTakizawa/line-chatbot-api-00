import {Model, DataTypes} from "sequelize";
import {sequelize} from "../database.js";

class DailyConversationCount extends Model {
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

    getDate() {
        return this.getDataValue('date');
    }

    setDate(value) {
        this.setDataValue('date', value);
    }

    getCount() {
        return this.getDataValue('count');
    }

    setCount(value) {
        this.setDataValue('count', value);
    }
}

DailyConversationCount.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    count: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
}, {
    tableName: 'daily_conversation_counts',
    sequelize,
});

DailyConversationCount.associate = (models) => {
    DailyConversationCount.belongsTo(models.User, { foreignKey: 'userId' });

}

export default DailyConversationCount;
