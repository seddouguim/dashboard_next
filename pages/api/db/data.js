import { prisma } from "../../../utils/prisma";
import authenticate from "../../../middleware/authenticate";

async function handler(req, res) {
  const { startDate, endDate } = req.query;

  console.log(startDate, endDate);

  try {
    const data = await prisma.deviceData.findMany({
      where: {
        device_id: req.query.id,
        timestamp: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
      orderBy: {
        timestamp: "asc",
      },
    });
    res.status(200).json(data || []); // Set default value to an empty array if data is undefined or null
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    prisma.$disconnect();
  }
}

export default authenticate(handler);
