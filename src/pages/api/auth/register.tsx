import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import corsCheck from "@/middleware/corsCheck";

const prisma = new PrismaClient();

export default async function handleRegister(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await corsCheck(req, res);

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
    if (!username && !email && !password && !role) {
      res.status(400).json({ message: "Please fill all the fields" });
      return;
    }

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
