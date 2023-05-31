"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const sequelize_1 = require("sequelize");
const User_1 = require("./User");
const sequelize_2 = require("../adapters/sequelize");
const Dependency_1 = require("./Dependency");
class Task extends sequelize_1.Model {
}
exports.Task = Task;
Task.init({
    taskID: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        validate: {
            isInt: { msg: 'taskID must be an integer' }
        }
    },
    name: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
            min: 2,
            max: 50,
        }
    },
    description: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
        validate: {
            min: 1,
            max: 100,
        }
    },
    owner: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        validate: {
            isInt: { msg: 'owner must be an integer' }
        }
    },
    reviewer: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        validate: {
            isInt: { msg: 'reviewer must be an integer' }
        }
    },
    dueDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: true,
            isAfter: {
                args: new Date().toISOString(),
                msg: 'Due date must be in the future.'
            },
        }
    },
    startDate: {
        type: sequelize_1.DataTypes.DATE,
        validate: {
            isDate: true,
        }
    },
    workflowID: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        validate: {
            isInt: { msg: 'workflowID must be an integer' }
        }
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: true,
        }
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: true,
        }
    }
}, {
    sequelize: sequelize_2.sequelize,
    timestamps: true,
    modelName: 'Task'
});
Task.hasOne(User_1.User, { foreignKey: 'owner' });
Task.hasOne(User_1.User, { foreignKey: 'reviewer' });
User_1.User.belongsTo(Task, { foreignKey: 'owner' });
User_1.User.belongsTo(Task, { foreignKey: 'reviewer' });
Task.belongsToMany(Task, { otherKey: 'dependency', foreignKey: 'taskID', as: 'Dependency', through: Dependency_1.Dependency });
