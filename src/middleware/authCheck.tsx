import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

interface DecodedToken {
  userId: number;
}

const authCheck = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.headers.authorization) {
    throw new Error("Unauthorized");
  }
  const tokenWithBearer = req.headers.authorization;
  const token = tokenWithBearer.split(" ")[1];
  const decodedToken = jwt.verify(
    token,
    process.env.API_KEY || ""
  ) as DecodedToken;
  const userId = decodedToken.userId;

  return userId;
};

export default authCheck;
