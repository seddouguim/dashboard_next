import { cognitoIdentityServiceProvider } from "../../../aws/config";
import { generateSecretHash } from "../../../aws/utils";

import cookie from "cookie";

export default async function handler(req, res) {
  const { email, password } = req.body;

  const secretHash = generateSecretHash(email);

  const expiryDate = new Date();
  expiryDate.setMonth(expiryDate.getMonth() + 1);

  const params = {
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: process.env.APP_CLIENT_ID,
    AuthParameters: {
      SECRET_HASH: secretHash,
      USERNAME: email,
      PASSWORD: password,
    },
  };

  try {
    const response = await cognitoIdentityServiceProvider
      .initiateAuth(params)
      .promise();

    res.setHeader("Set-Cookie", [
      cookie.serialize(
        "access_token",
        response.AuthenticationResult.AccessToken,
        {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          sameSite: "strict",
          maxAge: 3600,
          path: "/",
        }
      ),

      cookie.serialize(
        "refresh_token",
        response.AuthenticationResult.RefreshToken,
        {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          sameSite: "strict",
          path: "/",
          expires: expiryDate,
        }
      ),

      cookie.serialize("id_token", response.AuthenticationResult.IdToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 3600,
        path: "/",
      }),
    ]);

    return res
      .status(200)
      .json({ message: "User logged in successfully", response });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
