import { CloudWatchLogs, config } from "aws-sdk";

import { prisma } from "../../../utils/prisma";
import authenticate from "../../../middleware/authenticate";

config.update({ region: "us-east-1" });
const cloudwatchLogs = new CloudWatchLogs();

const logGroup = "Dashboard/Power_Consumption_Endpoint";
const logStream = "Testing";

function sendLogs(logGroup, logStream, logEvents) {
  const params = {
    logGroupName: logGroup,
    logStreamName: logStream,
    logEvents: logEvents,
  };

  cloudwatchLogs.putLogEvents(params, (err, data) => {
    if (err) {
      console.error("Failed to send logs to CloudWatch Logs:", err);
    } else {
      console.log("Logs sent to CloudWatch Logs:", data);
    }
  });
}

async function calculatePowerConsumption(startDate, endDate) {
  try {
    const energy = await prisma.deviceData.aggregate({
      _sum: {
        pump_kwh: true,
        resistance_kwh: true,
      },
      where: {
        timestamp: {
          gte: startDate,
          lt: endDate,
        },
      },
    });

    // Check if energy data is null and return 0 instead
    const pumpEnergy = energy?._sum?.pump_kwh ?? 0;
    const resistanceEnergy = energy?._sum?.resistance_kwh ?? 0;

    return {
      pumpEnergy,
      resistanceEnergy,
    };
  } catch (error) {
    console.error(error);

    const errorEvent = {
      timestamp: new Date().getTime(),
      message: "Failed to calculate power consumption: " + error.message,
    };

    sendLogs(logGroup, logStream, [errorEvent]);

    throw new Error("Failed to calculate power consumption");
  } finally {
    prisma.$disconnect();
  }
}

async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set time to start of the day

      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      startOfMonth.setHours(0, 0, 0, 0); // Set time to start of the month

      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      endOfMonth.setHours(23, 59, 59, 999); // Set time to end of the month

      const dailyEnergy = await calculatePowerConsumption(today, new Date());
      const monthlyEnergy = await calculatePowerConsumption(
        startOfMonth,
        endOfMonth
      );

      const pumpPower = 20; // Pump power rating in watts
      const resistancePower = 3000; // Resistance power rating in watts
      const pumpEnergy = (pumpPower / 1000) * (1 / 60); // Energy consumed by pump in kWh (1 minute = 1/60 hours)
      const resistanceEnergy = (resistancePower / 1000) * (1 / 60); // Energy consumed by resistance in kWh (1 minute = 1/60 hours)

      res.status(200).json({
        data: {
          daily: dailyEnergy,
          monthly: monthlyEnergy,
        },
        theoretical: {
          "1 minute": {
            pumpEnergy,
            resistanceEnergy,
          },
        },
      });

      const logEvent = {
        timestamp: new Date().getTime(),
        message: "Power consumption data retrieved",
      };

      sendLogs(logGroup, logStream, [logEvent]);
    } catch (error) {
      console.error("Error occurred:", error);

      const errorEvent = {
        timestamp: new Date().getTime(),
        message: "Error occurred: " + error.message,
      };

      sendLogs(logGroup, logStream, [errorEvent]);

      res
        .status(500)
        .json({ error: "Failed to retrieve power consumption data" });
    } finally {
      console.log("Power consumption data retrieved");
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

export default authenticate(handler);
