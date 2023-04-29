// pages/api/login.ts

import Cors from "cors";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const cors = Cors({
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
});

const handleLogin = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await new Promise((resolve, reject) => {
      cors(req, res, (err) => {
        if (err) return reject(err);
        resolve(true);
      });
    });
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Invalid email or password");
    }

    const token = jwt.sign({ userId: user.id }, process.env.API_KEY || "", {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Logged in successfully", token });
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};

export default handleLogin;
