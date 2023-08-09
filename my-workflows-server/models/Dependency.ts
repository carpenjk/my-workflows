import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize'
import { sequelize } from '../adapters/sequelize';

export class Dependency extends Model<InferAttributes<Dependency>, InferCreationAttributes<Dependency>> {
  declare taskID: bigint;
  declare dependencies: bigint;
  // timestamps
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
 }

Dependency.init({
  taskID: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    validate: {
      isInt: { msg: 'taskID must be an integer' }
    }
  },
  dependencies: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    validate: {
      isInt: { msg: 'taskID must be an integer' }
    }
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: true,
    }
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: true,
    }
  }
}, {
  sequelize,
  timestamps: true,
  modelName: 'Dependency'
})
