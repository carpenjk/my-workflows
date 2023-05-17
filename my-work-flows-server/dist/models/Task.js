"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const sequelize_1 = require("sequelize");
const sequelize = require('../adapters/sequelize');
class Task extends sequelize_1.Model {
}
exports.Task = Task;
Task.init({
    taskID: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
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
    },
    reviewer: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    dueDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    startDate: {
        type: sequelize_1.DataTypes.DATE,
    },
    dependencies: {
        type: sequelize_1.DataTypes.STRING(100),
        // get(this: Task): bigint[] {
        //   const val = this.getDataValue('dependencies');
        //   console.log("🚀 ~ file: Task.ts:81 ~ get ~ val:", val)
        //   return val;
        //   // return this.getDataValue('dependencies').split(',').map((val: string) => BigInt(val))
        // },
        set(val) {
            return val.join(',');
        }
    },
    workflowID: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    }
}, {
    sequelize,
    timestamps: true,
    modelName: 'Task'
});
