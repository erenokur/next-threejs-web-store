import Cors from "cors";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const cors = Cors({
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
});

export default async function handleLogin(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await new Promise((resolve, reject) => {
      cors(req, res, (err) => {
        if (err) return reject(err);
        resolve(true);
      });
    });
    if (req.method !== "POST") {
      res.status(405).json({ message: "Method not allowed" });
      return;
    }

    const { email, password } = req.body;
    console.log(email, password);
    const user = await prisma.user.findUnique({ where: { email: email } });
    if (!user) {
      throw new Error("Invalid email or password");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid email or password");
    }
    const token = jwt.sign({ userId: user.id }, process.env.API_KEY || "", {
      expiresIn: "48h",
    });

    res.status(200).json({
      message: "Logged in successfully",
      token,
      username: user.username,
      role: user.username,
    });
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
}
