import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";

const client = jwksClient({
  jwksUri: "./jwks.json",
});

export default async function getPublicKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    if (err) {
      callback(err);
    } else {
      const signingKey = key.publicKey || key.rsaPublicKey;
      callback(null, signingKey);
    }
  });
}

export function decodeToken(token, callback) {
  const options = {
    algorithms: ["RS256"],
    issuer: "<ISSUER>",
    audience: "<AUDIENCE>",
  };
  jwt.verify(token, getPublicKey, options, callback);
}
