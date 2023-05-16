import { DataTypes, Model, Optional } from 'sequelize'
const sequelize = require('../adapters/sequelize');

interface UserAttributes {
  id: BigInt,
  name: string,
  email: string,
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export interface UserInput extends Optional<UserAttributes, 'id'> { }
export interface UserOuput extends Required<UserAttributes> { }


export class Users extends Model<UserAttributes, UserInput> implements UserAttributes {
  public id!: BigInt;
  public name!: string;
  public email!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

}

Users.init({
  id: {
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
    }
  }
}, {
  sequelize,
  timestamps: true,
  modelName: 'User'
})