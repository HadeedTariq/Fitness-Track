"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authChecker = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authChecker = (req, res, next) => {
    const token = req.cookies?.accessToken;
    if (!token) {
        return next({ message: "Token is required", status: 404 });
    }
    const user = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (user) {
        req.body.user = user;
        next();
    }
    else {
        next({ message: "Invalid Tokens", status: 404 });
    }
};
exports.authChecker = authChecker;
//# sourceMappingURL=authChecker.js.map