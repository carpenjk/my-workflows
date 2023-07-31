import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import { User } from './User';
import { sequelize } from '../adapters/sequelize';
import { Dependency } from './Dependency';

export class Task extends Model<InferAttributes<Task>, InferCreationAttributes<Task>> {
  declare taskID: CreationOptional<bigint>;
  declare name: string;
  declare description: string;
  declare owner: bigint;
  declare reviewer: bigint;
  declare dueDate: Date;
  declare workflowID: bigint;

  // timestamps
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Task.init({
  taskID: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    validate: {
      isInt: { msg: 'taskID must be an integer' }
    }
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    validate: {
      min: 2,
      max: 50,
    }
  },
  description: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      min: 1,
      max: 100,
    }
  },
  owner: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    validate: {
      isInt: { msg: 'owner must be an integer' }
    }
  },
  reviewer: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    validate: {
      isInt: { msg: 'reviewer must be an integer' }
    }
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: true,
      isAfter: {
        args: new Date().toISOString(),
        msg: 'Due date must be in the future.'
      },
    }
  },
  workflowID: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    validate: {
      isInt: { msg: 'workflowID must be an integer' }
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
  modelName: 'Task'
})

Task.hasOne(User, { foreignKey: 'owner' });
Task.hasOne(User, { foreignKey: 'reviewer' });
User.belongsTo(Task, { foreignKey: 'owner' });
User.belongsTo(Task, { foreignKey: 'reviewer' });

Task.belongsToMany(Task, { otherKey: 'dependency', foreignKey: 'taskID', as: 'Dependency', through: Dependency });