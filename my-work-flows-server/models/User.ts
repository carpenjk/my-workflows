import { DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, Model } from 'sequelize'
import bcrypt from 'bcrypt';
require('dotenv').config();

import { sequelize } from '../adapters/sequelize';


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

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare userID: CreationOptional<bigint>;
  declare name: string;
  declare email: string;
  declare password: string;

  // timestamps
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;


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
}

User.init({
  userID: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    validate: {
      isInt: { msg: "userID must be an integer." },
    }
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
      isEmail: { msg: 'Email must be a valid email.' }
    },
  },
  password: {
    type: DataTypes.STRING(64),
    allowNull: false,
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
  modelName: 'User'
});

async function hashPassword(p: string): Promise<string> {
  const hashedPassword = await bcrypt.hash(p, 10);
  return hashedPassword;
}

User.beforeCreate(async (user) => {
  const hashedPassword = await hashPassword(user.password);
  user.password = hashedPassword;
});

User.beforeBulkCreate(async (users: User[]) => {
  const promises: Promise<string>[] = users.map((user: User) => hashPassword(user.password));
  const hashedPwds: string[] = await Promise.all(promises);
  users.forEach((user: User, i: number) => user.password = hashedPwds[i]);
});