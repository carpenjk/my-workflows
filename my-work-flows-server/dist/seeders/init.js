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
Object.defineProperty(exports, "__esModule", { value: true });
const Users_1 = require("../models/Users");
require('dotenv').config();
const isDev = process.env.NODE_ENV === 'development';
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    yield Users_1.Users.sync({ force: isDev });
    const result = yield Users_1.Users.bulkCreate([
        { name: 'Guest One', email: 'guest1@example.com', createdAt: new Date(), updatedAt: new Date(), deletedAt: new Date() },
        { name: 'Guest Two', email: 'guest2@example.com', createdAt: new Date(), updatedAt: new Date(), deletedAt: new Date() }
    ]);
    console.log("🚀 ~ file: init.ts:10 ~ dbInit ~ result:", result);
});
init();
exports.default = init;
