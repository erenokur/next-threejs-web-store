import { PrismaClient, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import authCheck from "@/middleware/authCheck";
import corsCheck from "@/middleware/corsCheck";
import { createUserData } from "@/utilities/createUserData.tsx";

interface UpdateData {
  email?: User["email"];
  username?: User["username"];
  password?: User["password"];
  role?: User["role"];
}

const prisma = new PrismaClient();

export default async function handleLogin(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    await corsCheck(req, res);

    if (req.method !== "PUT") {
      res.status(405).json({ message: "Method not allowed" });
      return;
    }

    const userId = await authCheck(req, res);

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new Error("Invalid user ID");
    }

    const data = createUserData(req.body);

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data,
    });

    res.status(200).json({
      message: "User data changed successfully",
      email: updatedUser.email,
      username: updatedUser.username,
      role: updatedUser.role,
    });
  } catch (error: any) {
    prisma.$disconnect();
    res.status(401).json({ message: error.message });
  }
}
