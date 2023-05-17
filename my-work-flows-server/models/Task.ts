import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
const sequelize = require('../adapters/sequelize');

export class Task extends Model<InferAttributes<Task>, InferCreationAttributes<Task>> {
  declare taskID: CreationOptional<bigint>;
  declare name: string;
  declare description: string;
  declare owner: bigint;
  declare reviewer: bigint;
  declare dueDate: Date;
  declare startDate: CreationOptional<Date>;
  declare dependencies: CreationOptional<bigint[]>;
  declare workflowID: bigint;

  // timestamps
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

}

Task.init({
  taskID: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
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
  },
  reviewer: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATE,
  },
  dependencies: {
    type: DataTypes.STRING(100),
    // get(this: Task): bigint[] {
    //   const val = this.getDataValue('dependencies');
    //   console.log("🚀 ~ file: Task.ts:81 ~ get ~ val:", val)
    //   return val;
    //   // return this.getDataValue('dependencies').split(',').map((val: string) => BigInt(val))
    // },
    set(val: bigint[]) {
      this.setDataValue('dependencies', val.join(','));
    }
  },
  workflowID: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  }
}, {
  sequelize,
  timestamps: true,
  modelName: 'Task'
})