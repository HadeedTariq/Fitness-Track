import { User } from "../routes/user/user.model";

const generateAccessAndRefereshTokens = async (userId: string) => {
  const user = await User.findById(userId);
  const accessToken = user?.generateAccessToken();
  const refreshToken = user?.generateRefreshToken();
  if (user) {
    user.refreshToken = refreshToken;
    await user?.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } else {
    return { refreshToken: "", accessToken: "" };
  }
};

export { generateAccessAndRefereshTokens };
