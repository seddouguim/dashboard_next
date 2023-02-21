import crypto from "crypto";

export const generateSecretHash = (email) => {
  const secretHash = crypto
    .createHmac("sha256", process.env.APP_CLIENT_SECRET)
    .update(email + process.env.APP_CLIENT_ID)
    .digest("base64");

  return secretHash;
};
