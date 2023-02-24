import dotenv from "dotenv";
dotenv.config();

import AWS from "aws-sdk";

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
