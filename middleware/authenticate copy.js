import { cognitoIdentityServiceProvider } from "../aws/config";
import { generateSecretHash } from "../aws/utils";
import { extractUsernameFromAccessToken } from "../utils";
import cookie from "cookie";

const authenticate = (handler) => async (req, res) => {
  try {
    console.log("Authenticating user...");
    const { access_token, refresh_token } = cookie.parse(req.headers.cookie);

    if (!access_token && !refresh_token) {
      return res.status(401).json({ message: "No access or refresh token." });
    }

    if (access_token) {
      // Verify the access token to check if it's still valid
      try {
        await cognitoIdentityServiceProvider
          .verifyAccessToken({
            AccessToken: access_token,
            ClientId: process.env.APP_CLIENT_ID,
          })
          .promise();

        // Access token is valid, call the handler
        return handler(req, res);
      } catch (error) {
        console.log("Access token is invalid, trying to refresh...", error);
      }
    }

    if (refresh_token) {
      // Try to refresh the access token using the refresh token
      try {
        const username = extractUsernameFromAccessToken(access_token);
        const response = await cognitoIdentityServiceProvider
          .initiateAuth({
            AuthFlow: "REFRESH_TOKEN_AUTH",
            ClientId: process.env.APP_CLIENT_ID,
            AuthParameters: {
              REFRESH_TOKEN: refresh_token,
              SECRET_HASH: generateSecretHash(username),
            },
          })
          .promise();

        // Update the access token in the cookies
        const newAccessToken = response.AuthenticationResult.AccessToken;
        const newIdToken = response.AuthenticationResult.IdToken;

        res.setHeader("Set-Cookie", [
          cookie.serialize("access_token", newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 3600,
            path: "/",
          }),

          cookie.serialize("id_token", newIdToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 3600,
            path: "/",
          }),
        ]);

        // Access token has been refreshed, call the handler
        console.log("Access token has been refreshed.");
        return handler(req, res);
      } catch (error) {
        console.log("Failed to refresh access token:", error);
      }
    }

    return res.status(401).json({ message: "Failed to authenticate user." });
  } catch (error) {
    console.log("Internal server error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default authenticate;
