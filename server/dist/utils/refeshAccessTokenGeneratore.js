"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessAndRefereshTokens = void 0;
const user_model_1 = require("../routes/user/user.model");
const generateAccessAndRefereshTokens = async (userId) => {
    const user = await user_model_1.User.findById(userId);
    const accessToken = user?.generateAccessToken();
    const refreshToken = user?.generateRefreshToken();
    if (user) {
        user.refreshToken = refreshToken;
        await user?.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    }
    else {
        return { refreshToken: "", accessToken: "" };
    }
};
exports.generateAccessAndRefereshTokens = generateAccessAndRefereshTokens;
//# sourceMappingURL=refeshAccessTokenGeneratore.js.map