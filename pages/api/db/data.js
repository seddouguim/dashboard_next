import { prisma } from "../../../utils/prisma";

import authenticate from "../../../middleware/authenticate";

async function handler(req, res) {
  try {
    const data = await prisma.deviceData.findMany({
      where: {
        device_id: req.query.id,
      },
      orderBy: {
        timestamp: "asc",
      },
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export default authenticate(handler);
