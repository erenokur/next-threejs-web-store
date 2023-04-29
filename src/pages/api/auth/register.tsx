import Cors from "cors";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const cors = Cors({
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
});
export default async function handleRegister(
  req: NextApiRequest,
  res: NextApiResponse
) {
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

  try {
    const { username, email, password, role } = req.body;

    // Check if email is already registered
    const user = await prisma.user.findUnique({ where: { email } });

    if (user) {
      res.status(400).json({ message: "Email already registered" });
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hashedPassword,
        role: role,
      },
    });

    // Generate a JWT token
    const token = jwt.sign({ userId: newUser.id }, process.env.API_KEY || "");

    res.status(201).json({ accessToken: token, username: newUser.username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
