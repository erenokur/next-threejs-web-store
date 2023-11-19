import { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";

const cors = Cors({
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
});

const corsCheck = async (req: NextApiRequest, res: NextApiResponse) => {
  await new Promise<void>((resolve, reject) => {
    cors(req, res, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

export default corsCheck;
