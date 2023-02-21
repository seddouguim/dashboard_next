import dotenv from "dotenv";
dotenv.config();

import AWS from "aws-sdk";

const IDENTITY_POOL_ID = process.env.IDENTITY_POOL_ID;

// AWS.config.update({
//   region: "us-east-1",
//   credentials: new AWS.CognitoIdentityCredentials({
//     IdentityPoolId: IDENTITY_POOL_ID,
//   }),
//   iot: {
//     credentials: {
//       accessKeyId: "AKIAVN5RAMCY74ZMRUJW",
//       secretAccessKey: "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",
//     },
//   },
// });

AWS.config.update({
  accessKeyId: "AKIAVN5RAMCY74ZMRUJW",
  secretAccessKey: "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",
  region: "us-east-1",
});

const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();

const iotDevice = new AWS.IotData({
  endpoint: "a2bc1rtj36q5u9-ats.iot.us-east-1.amazonaws.com",
});

export { cognitoIdentityServiceProvider, iotDevice };
