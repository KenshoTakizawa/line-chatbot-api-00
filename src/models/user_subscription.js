import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

class UserSubscription extends Model {
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

    getExpiresAt() {
        return this.getDataValue('expiresAt');
    }

    setExpiresAt(value) {
        this.setDataValue('expiresAt', value);
    }
}

UserSubscription.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    aiId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    tableName: 'user_subscriptions',
    sequelize,
});

UserSubscription.associate = (models) => {
    UserSubscription.belongsTo(models.User, { foreignKey: 'userId' });
    UserSubscription.belongsTo(models.Ai, { foreignKey: 'aiId' });
}

export default UserSubscription;
