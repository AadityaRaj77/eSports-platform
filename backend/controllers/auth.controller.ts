import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";
import { signToken } from "../utils/jwt";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { gamertag, email, password } = req.body as {
      gamertag: string;
      email: string;
      password: string;
    };

    const existing = await prisma.user.findFirst({
      where: { OR: [{ email }, { gamertag }] }
    });

    if (existing) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { gamertag, email, passwordHash, isProfileComplete:false }
    });

    const token = signToken(user.id);

    res.json({ token, redirect: "/profile" });
  } catch (err) {
    res.status(500).json({ message: "Register failed" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { identifier, password } = req.body as {
      identifier: string;
      password: string;
    };

    if (!identifier || !password) {
      res.status(400).json({ message: "Missing credentials" });
      return;
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: identifier }, { gamertag: identifier }]
      }
    });

    if (!user) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const token = signToken(user.id);

    res.json({
      token,
      redirect: user.isProfileComplete ? "/dashboard" : "/profile"
    });
  } catch {
    res.status(500).json({ message: "Login failed" });
  }
};
