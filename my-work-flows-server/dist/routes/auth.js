"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const passport_1 = require("../middleware/passport");
const unauthenticatedError_1 = require("../errors/unauthenticatedError");
const router = express_1.default.Router();
router.post('/register', auth_1.register);
router.post('/login', passport_1.passport.authenticate('local', { failureMessage: true }), function (req, res, next) {
    if (req.user) {
        res.send({ user: req.user });
    }
    else {
        next(new unauthenticatedError_1.UnauthenticatedError('Invalid email or password.'));
    }
});
exports.default = router;
