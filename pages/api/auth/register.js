import { cognitoIdentityServiceProvider } from "../../../aws/config";
import { generateSecretHash } from "../../../aws/utils";

export default async function handler(req, res) {
  const { email, password, fullName } = req.body;

  const secretHash = generateSecretHash(email);

  const params = {
    ClientId: process.env.APP_CLIENT_ID,
    SecretHash: secretHash,
    Username: email,
    Password: password,
    UserAttributes: [
      {
        Name: "name",
        Value: fullName,
      },
      {
        Name: "email",
        Value: email,
      },
    ],
  };

  try {
    const data = await cognitoIdentityServiceProvider.signUp(params).promise();
    res.status(200).json({ data: data });
  } catch (err) {
    res.status(500).json({ error: err });
  }
}
