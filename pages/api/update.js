import { iotDevice } from "../../aws/config";

import authenticate from "../../middleware/authenticate";

async function handler(req, res) {
  // Set the request parameters to get the device shadow

  const shadowDocument = {
    state: {
      desired: {
        resistance_state: false,
        pump_state: false,
      },
      reported: {
        current_temperature: "0",
        current_kwh: "0",
        resistance_state: "false",
        pump_state: "false",
      },
    },
  };
  const params = {
    thingName: "ESP8266",
    payload: JSON.stringify(shadowDocument),
  };

  iotDevice.updateThingShadow(params, function (err, data) {
    if (err) {
      console.error(err);
    } else {
      console.log(data);

      res.status(200).json({ message: "Success" });
    }
  });
}

export default authenticate(handler);
