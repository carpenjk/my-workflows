import { InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import bcrypt from 'bcrypt';
require('dotenv').config();

import { BeforeBulkCreate, BeforeCreate, Column, CreatedAt, DataType,HasMany,Model, Table, UpdatedAt } from 'sequelize-typescript';
import { Workflow } from './Workflow';
import { Task } from './Task';

export interface SessionUser {
  userID: bigint,
  email: string,
  name: string
}

declare global {
  namespace Express {
    interface User extends SessionUser{}
  }
}

@Table({timestamps: true, modelName: 'User'})
export class User extends Model<InferAttributes<User>, InferCreationAttributes<User, { omit: never; }>> {
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    validate: {
      isInt: { msg: "userID must be an integer." },
    }
  })
  declare userID: CreationOptional<bigint>;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    validate: {
      min: 2,
      max: 50,
    }
  })
  declare name: string;
  
  @Column({
    type: DataType.STRING(60),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: { msg: 'Email must be a valid email.' }
    },
  })
  declare email: string;

  @Column({
    type: DataType.STRING(64),
    allowNull: false,
  })
  declare password: string;

  @CreatedAt
  declare createdAt: CreationOptional<Date>;

  @HasMany(()=> Workflow, {as: 'workflowOwner'}) 
  declare workflows: CreationOptional<Workflow[]>;

  @HasMany(()=> Task,{as:'taskOwner'}) 
  declare tasks: CreationOptional<Task[]>;

  async comparePassword(enteredPassword: string) {

    const isMatch = await bcrypt.compare(enteredPassword, this.password);
    return isMatch;
  }

  static serializeUser(user:Express.User, cb: Function) {
    process.nextTick(function() {
      return cb(null, {
        userID: user.userID,
        email: user.email,
        name: user.name
      });
    });

  
  }

  static async deserializeUser(user: Express.User, cb: Function) {
    try{
      const dbUser: User | null = await User.findOne({where:{email: user.email}});
      if(!dbUser){
        return cb(null, false);
      }
      const sessionUser: Express.User = {userID: dbUser.userID, email: dbUser.email, name: dbUser.name}
      return cb(null, sessionUser);
    } catch(e){
      return cb(e);
    }
  }

  @BeforeCreate
  static async hash(user: {password: string}) {
    const hashedPassword = await hashPassword(user.password);
    user.password = hashedPassword;
  };

  @BeforeBulkCreate
  static async hashPasswords (users: User[]) {
    const promises: Promise<string>[] = users.map((user: User) => hashPassword(user.password));
    const hashedPwds: string[] = await Promise.all(promises);
    users.forEach((user: User, i: number) => user.password = hashedPwds[i]);
  };
}

async function hashPassword(p: string): Promise<string> {
  const hashedPassword = await bcrypt.hash(p, 10);
  return hashedPassword;
}