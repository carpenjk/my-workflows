"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = void 0;
const http_status_codes_1 = require("http-status-codes");
const customAPIError_1 = require("../errors/customAPIError");
const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof customAPIError_1.CustomAPIError) {
        return res.status(err.statusCode).json({ msg: err.message });
    }
    return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'Something went wrong, please try again' });
};
exports.errorHandlerMiddleware = errorHandlerMiddleware;
