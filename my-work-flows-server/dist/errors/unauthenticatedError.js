"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthenticatedError = void 0;
const http_status_codes_1 = require("http-status-codes");
const customAPIError_1 = require("./customAPIError");
class UnauthenticatedError extends customAPIError_1.CustomAPIError {
    constructor(message) {
        super(message, http_status_codes_1.StatusCodes.UNAUTHORIZED);
    }
}
UnauthenticatedError.messages = {
    INVALID: 'Invalid email or password.',
    LOGGED_OUT: 'User must log in.'
};
exports.UnauthenticatedError = UnauthenticatedError;
