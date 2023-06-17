import { iotDevice } from "../../aws/config";

import authenticate from "../../middleware/authenticate";

async function handler(req, res) {
  // Set the request parameters to get the device shadow
  const params = {
    thingName: "ESP01",
  };

  // Set a timeout value (in milliseconds)
  const timeout = 5000; // 5 seconds

  try {
    // Create a Promise that wraps the AWS IoT SDK request
    const shadowPromise = iotDevice.getThingShadow(params).promise();

    // Create a Promise that resolves after the specified timeout
    const timeoutPromise = new Promise((resolve) =>
      setTimeout(resolve, timeout)
    );

    // Wait for either the shadowPromise or the timeoutPromise to resolve
    const response = await Promise.race([shadowPromise, timeoutPromise]);

    // If the shadowPromise resolved first, handle the response
    if (response) {
      // Extract the shadow data from the response
      const shadow = JSON.parse(response.payload);

      // Return the shadow data as the API response
      res.status(200).json(shadow);
    } else {
      // If the timeoutPromise resolved first, return a timeout error
      res.status(408).json({ message: "Request timeout" });
    }
  } catch (err) {
    // Handle any errors that occur during the API request
    console.error(err);
    res.status(500).json({ message: "Internal server error", error: err });
  }
}

export default authenticate(handler);
