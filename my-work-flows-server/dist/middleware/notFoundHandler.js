"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = void 0;
const notFoundError_1 = require("../errors/notFoundError");
const notFoundHandler = (req, res, next) => {
    return next(new notFoundError_1.NotFoundError('Route does not exist.'));
};
exports.notFoundHandler = notFoundHandler;
