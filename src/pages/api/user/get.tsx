import Cors from "cors";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import authCheck from "@/middleware/authCheck";

const prisma = new PrismaClient();
const cors = Cors({
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
});

export default async function handleLogin(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    await new Promise<void>((resolve, reject) => {
      cors(req, res, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });

    if (req.method !== "GET") {
      res.status(405).json({ message: "Method not allowed" });
      return;
    }
    const userId = await authCheck(req, res);

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new Error("Invalid user ID");
    }

    res.status(200).json({
      message: "Logged in successfully",
      email: user.email,
      username: user.username,
      role: user.role,
    });
  } catch (error: any) {
    prisma.$disconnect();
    res.status(401).json({ message: error.message });
  }
}
