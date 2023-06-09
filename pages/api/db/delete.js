import { prisma } from "../../../utils/prisma";

import authenticate from "../../../middleware/authenticate";

async function handler(req, res) {
  try {
    const resonse = await prisma.deviceData.deleteMany({
      where: {
        device_id: req.query.id,
      },
    });
    res.status(200).json(resonse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export default authenticate(handler);
