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
exports.authenticateUser = void 0;
const unauthenticatedError_1 = require("../errors/unauthenticatedError");
const jwt_1 = require("../utils/jwt");
const authenticateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return next(new unauthenticatedError_1.UnauthenticatedError('Authentication invalid'));
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return next(new unauthenticatedError_1.UnauthenticatedError('Authentication Invalid'));
    }
    try {
        // const { name, userID, email }: { name: string, userID: number, email: string } = isTokenValid({ token });
        const payload = (0, jwt_1.isTokenValid)({ token });
        // req.body = { name, userID, role: email };
        console.log("🚀 ~ file: authentication.ts:17 ~ authenticateUser ~ payload:", payload);
        next();
    }
    catch (error) {
        return next(new unauthenticatedError_1.UnauthenticatedError('Authentication Invalid'));
    }
});
exports.authenticateUser = authenticateUser;
