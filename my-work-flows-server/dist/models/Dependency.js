"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dependency = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../adapters/sequelize");
class Dependency extends sequelize_1.Model {
}
exports.Dependency = Dependency;
Dependency.init({}, {
    sequelize: sequelize_2.sequelize,
    timestamps: true,
    modelName: 'Task_Dependency'
});
