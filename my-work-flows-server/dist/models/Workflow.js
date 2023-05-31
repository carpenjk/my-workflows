"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workflow = void 0;
const sequelize_1 = require("sequelize");
const Task_1 = require("./Task");
const sequelize_2 = require("../adapters/sequelize");
class Workflow extends sequelize_1.Model {
}
exports.Workflow = Workflow;
Workflow.init({
    workflowID: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        validate: {
            isInt: { msg: 'workflowID must be an integer' }
        }
    },
    name: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
        validate: {
            min: 1,
            max: 50,
        }
    },
    description: {
        type: sequelize_1.DataTypes.STRING(60),
        allowNull: false,
        validate: {
            min: 1,
            max: 50,
        }
    },
    completedDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
        validate: {
            isDate: true,
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
    modelName: 'Workflow'
});
Workflow.hasMany(Task_1.Task, { foreignKey: 'workflowID' });
Task_1.Task.belongsTo(Workflow, { foreignKey: 'workflowID' });
