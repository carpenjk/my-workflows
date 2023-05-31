"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const bcrypt_1 = __importDefault(require("bcrypt"));
require('dotenv').config();
const sequelize_2 = require("../adapters/sequelize");
class User extends sequelize_1.Model {
    comparePassword(enteredPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const isMatch = yield bcrypt_1.default.compare(enteredPassword, this.password);
            return isMatch;
        });
    }
}
exports.User = User;
User.init({
    userID: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        validate: {
            isInt: { msg: "userID must be an integer." },
        }
    },
    name: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
        validate: {
            min: 2,
            max: 50,
        }
    },
    email: {
        type: sequelize_1.DataTypes.STRING(60),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: { msg: 'Email must be a valid email.' }
        },
    },
    password: {
        type: sequelize_1.DataTypes.STRING(64),
        allowNull: false,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: true,
        }
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: true,
        }
    }
}, {
    sequelize: sequelize_2.sequelize,
    timestamps: true,
    modelName: 'User'
});
function hashPassword(p) {
    return __awaiter(this, void 0, void 0, function* () {
        const hashedPassword = yield bcrypt_1.default.hash(p, 10);
        return hashedPassword;
    });
}
User.beforeCreate((user) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield hashPassword(user.password);
    user.password = hashedPassword;
}));
User.beforeBulkCreate((users) => __awaiter(void 0, void 0, void 0, function* () {
    const promises = users.map((user) => hashPassword(user.password));
    const hashedPwds = yield Promise.all(promises);
    users.forEach((user, i) => user.password = hashedPwds[i]);
}));
