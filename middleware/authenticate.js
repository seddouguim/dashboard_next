import { cognitoIdentityServiceProvider } from "../aws/config";
import { generateSecretHash } from "../aws/utils";
import { extractUsernameFromAccessToken } from "../utils";
import cookie from "cookie";

const authenticate = (handler) => async (req, res) => {
  const { accessToken, refreshToken } = cookie.parse(req.headers.cookie || "");

  return handler(req, res);
};

export default authenticate;
