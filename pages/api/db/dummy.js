import { prisma } from "../../../utils/prisma";
import authenticate from "../../../middleware/authenticate";

async function addDummyData() {
  try {
    // Generate dummy data for a specific timeframe (1 hour)
    const startDate = new Date();
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // Add 1 hour to the start date

    const data = [];

    let timestamp = startDate;
    while (timestamp <= endDate) {
      const resistanceState = true; // Set resistance state ON
      const pumpState = true; // Set pump state ON

      data.push({
        resistance_state: resistanceState,
        pump_state: pumpState,
        device_id: "cuid-01",
        current_temperature: 0,
        pump_on_time_total: 0,
        resistance_on_time_total: 0,
        current_cycle: "dummy",
        current_term: "dummy",
        pump_kwh: 0,
        resistance_kwh: 0,
        timestamp,
      });

      timestamp = new Date(timestamp.getTime() + 60 * 1000); // Add 1 minute to the timestamp
    }

    // Bulk insert the dummy data into the database
    await prisma.deviceData.createMany({
      data,
      skipDuplicates: true,
    });

    console.log("Dummy data added successfully.");
  } catch (error) {
    throw new Error(error);
  } finally {
    prisma.$disconnect();
  }
}

async function handler(req, res) {
  try {
    await addDummyData();
    res.status(200).json({ message: "Dummy data added successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export default authenticate(handler);
