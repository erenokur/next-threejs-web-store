import formidable from "formidable";
import fs from "fs";
import { PrismaClient, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import authCheck from "@/middleware/authCheck";
import corsCheck from "@/middleware/corsCheck";
import { createUserData } from "@/utilities/createUserData.tsx";

const prisma = new PrismaClient();

export default async function handleLogin(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    await corsCheck(req, res);

    if (req.method !== "POST") {
      res.status(405).json({ message: "Method not allowed" });
      return;
    }

    const userId = await authCheck(req, res);

    res.status(200).json({
      message: "User data changed successfully",
    });
  } catch (error: any) {
    prisma.$disconnect();
    res.status(401).json({ message: error.message });
  }
}
