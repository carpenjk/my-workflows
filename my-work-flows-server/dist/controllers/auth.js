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
exports.logout = exports.verify = exports.getUserWithSession = exports.register = void 0;
const asyncWrapper_1 = require("../middleware/asyncWrapper");
const User_1 = require("../models/User");
const badRequestError_1 = require("../errors/badRequestError");
const http_status_codes_1 = require("http-status-codes");
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
    res.status(http_status_codes_1.StatusCodes.CREATED).send({ redirect: '/login' });
}));
exports.getUserWithSession = (0, asyncWrapper_1.asyncWrapper)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("getUserWithSession: ", req.user);
    res.send({ msg: req.user });
}));
const verify = (email, password, cb) => __awaiter(void 0, void 0, void 0, function* () {
    if (!email || !password) {
        return cb(null, false, { message: 'Please provide email and password' });
    }
    try {
        const user = yield User_1.User.findOne({ where: { email } });
        if (!user) {
            return cb(null, false, { message: 'Please provide email and password' });
        }
        const isPasswordCorrect = yield (user === null || user === void 0 ? void 0 : user.comparePassword(password));
        if (!isPasswordCorrect) {
            return cb(null, false, { message: 'Please provide email and password' });
        }
        const sessionUser = { userID: user.userID, email: user.email, name: user.name };
        return cb(null, sessionUser);
    }
    catch (e) {
        cb(e);
    }
});
exports.verify = verify;
const logout = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        req.logout(function (err) {
            if (err) {
                return next(err);
            }
            res.redirect('/login');
        });
    });
};
exports.logout = logout;
