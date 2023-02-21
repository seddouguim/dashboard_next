import { cognitoIdentityServiceProvider } from "../../aws/config";

import cookie from "cookie";

import authenticate from "../../middleware/authenticate";

async function handler(req, res) {
  const access_token = cookie.parse(req.headers.cookie).access_token;

  const params = {
    AccessToken: access_token,
  };
  try {
    let data = await cognitoIdentityServiceProvider.getUser(params).promise();

    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ error: error });
    console.log(error);
  }
}

export default authenticate(handler);
