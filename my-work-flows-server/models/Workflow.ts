import { DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, Model } from 'sequelize'
import { Task } from './Task';
import { sequelize } from '../adapters/sequelize';


export class Workflow extends Model<InferAttributes<Workflow>, InferCreationAttributes<Workflow>> {
  declare workflowID: CreationOptional<BigInt>;
  declare name: string;
  declare description: string;
  declare completedDate: CreationOptional<Date | null>;

  // timestamps
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

}

Workflow.init({
  workflowID: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    validate: {
      isInt: { msg: 'workflowID must be an integer' }
    }
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      min: 1,
      max: 50,
    }
  },
  description: {
    type: DataTypes.STRING(60),
    allowNull: false,
    validate: {
      min: 1,
      max: 50,
    }
  },
  completedDate: {
    type: DataTypes.DATE,
    allowNull: true,
    validate: {
      isDate: true,
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
  modelName: 'Workflow'
})

Workflow.hasMany(Task, { foreignKey: 'workflowID' });
Task.belongsTo(Workflow, { foreignKey: 'workflowID' });