"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const customAPIError_1 = require("../errors/customAPIError");
const errorHandler = (err, req, res, next) => {
    let computedError = {
        statusCode: err.statusCode ? err.statusCode : http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong. Try again later.'
    };
    if (err instanceof customAPIError_1.CustomAPIError) {
        return res.status(err.statusCode).json({ msg: err.message });
    }
    return res.status(computedError.statusCode).json({ msg: computedError.msg });
};
exports.errorHandler = errorHandler;
