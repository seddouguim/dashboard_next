import { iotDevice } from "../../aws/config";

import authenticate from "../../middleware/authenticate";

async function handler(req, res) {
  // Set the request parameters to get the device shadow
  const params = {
    thingName: "ESP01",
  };

  try {
    // Get the device shadow from AWS IoT
    const response = await iotDevice.getThingShadow(params).promise();

    // Extract the shadow data from the response
    const shadow = JSON.parse(response.payload);

    // Return the shadow data as the API response
    res.status(200).json(shadow);
  } catch (err) {
    // Handle any errors that occur during the API request
    console.error(err);
    res.status(500).json({ message: "Internal server error", error: err });
  }
}

export default authenticate(handler);
