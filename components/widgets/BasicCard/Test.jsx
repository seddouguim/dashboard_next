import React, { useEffect, useState } from "react";
import AWS from "aws-sdk";

AWS.config.update({
  region: "us-east-1",
  credentials: new AWS.Credentials({
    accessKeyId: "AKIAVN5RAMCYSC6EWE4U",
    secretAccessKey: "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",
  }),
});

const iot = new AWS.IotData({
  endpoint: "a2bc1rtj36q5u9-ats.iot.us-east-1.amazonaws.com",
});

function Test() {
  const [deviceShadow, setDeviceShadow] = useState(null);

  useEffect(() => {
    const params = {
      thingName: "ESP8266",
      shadowName: "virtual_esp_state",
    };

    iot.getThingShadow(params, function (err, data) {
      if (err) {
        console.error(err, err.stack);
      } else {
        setDeviceShadow(JSON.parse(data.payload));
      }
    });
  }, []);

  return (
    <div>
      <h1>Device Shadow</h1>
      {deviceShadow ? (
        <pre>{JSON.stringify(deviceShadow, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Test;
