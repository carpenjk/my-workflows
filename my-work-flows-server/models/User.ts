import { DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, Model } from 'sequelize'
const sequelize = require('../adapters/sequelize');


export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare userID: CreationOptional<BigInt>;
  declare name: string;
  declare email: string;

  // timestamps
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

}

User.init({
  userID: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      min: 2,
      max: 50,
    }
  },
  email: {
    type: DataTypes.STRING(60),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    },
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
  modelName: 'User'
})