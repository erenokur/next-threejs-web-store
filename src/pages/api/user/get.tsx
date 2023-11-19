import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import authCheck from "@/middleware/authCheck";
import corsCheck from "@/middleware/corsCheck";

const prisma = new PrismaClient();

export default async function handleLogin(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    await corsCheck(req, res);

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
