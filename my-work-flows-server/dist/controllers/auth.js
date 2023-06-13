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
exports.login = exports.register = void 0;
const asyncWrapper_1 = require("../middleware/asyncWrapper");
const User_1 = require("../models/User");
const badRequestError_1 = require("../errors/badRequestError");
const unauthenticatedError_1 = require("../errors/unauthenticatedError");
const http_status_codes_1 = require("http-status-codes");
const jwt_1 = require("../utils/jwt");
exports.register = (0, asyncWrapper_1.asyncWrapper)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, password } = req.body;
    const emailAlreadyExists = yield User_1.User.findOne({ where: { email } });
    if (emailAlreadyExists) {
        return next(new badRequestError_1.BadRequestError('Email already exists'));
    }
    const user = yield User_1.User.create({
        name,
        email,
        password,
    });
    const tokenUser = { userID: user.userID, email: user.email, name: user.name };
    // attachCookiesToResponse({ res, user: tokenUser });
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ user: tokenUser });
}));
exports.login = (0, asyncWrapper_1.asyncWrapper)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.session)
    const { email, password } = req.body;
    if (!email || !password) {
        throw new badRequestError_1.BadRequestError('Please provide email and password');
    }
    const user = yield User_1.User.findOne({ where: { email } });
    if (!user) {
        throw new unauthenticatedError_1.UnauthenticatedError('Invalid Credentials');
    }
    const isPasswordCorrect = yield user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new unauthenticatedError_1.UnauthenticatedError('Invalid Credentials');
    }
    // compare password
    const token = (0, jwt_1.createJWT)({ userID: user.userID, name: user.name, email: user.email });
    res.status(http_status_codes_1.StatusCodes.OK).json({ user: { name: user.name }, token });
}));
