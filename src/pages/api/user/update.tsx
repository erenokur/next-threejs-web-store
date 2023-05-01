import Cors from "cors";
import { PrismaClient, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import authCheck from "@/middleware/authCheck";

interface UpdateData {
  email?: User["email"];
  username?: User["username"];
  password?: User["password"];
  role?: User["role"];
}

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

    if (req.method !== "PUT") {
      res.status(405).json({ message: "Method not allowed" });
      return;
    }

    const userId = await authCheck(req, res);

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new Error("Invalid user ID");
    }

    const { email, username, password, role } = req.body;
    const data: UpdateData = {};
    if (email !== null && email !== undefined) data.email = email;
    if (username !== null && username !== undefined) data.username = username;
    if (password !== null && password !== undefined)
      data.password = await bcrypt.hash(password, 10);
    if (role !== null && role !== undefined) data.role = role;

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
