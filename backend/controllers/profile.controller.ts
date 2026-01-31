import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { GameGenre } from "../generated/prisma/client";

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: {
        gamertag: true,
        email: true,
        primaryGenre: true,
        role: true,
        location: true,
        isProfileComplete: true
      }
    });

    res.json(user);
  } catch {
    res.status(500).json({ message: "Profile fetch failed" });
  }
};

export const completeProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { primaryGenre, role, location } = req.body as {
      primaryGenre: GameGenre;
      role: string;
      location: string;
    };

    await prisma.user.update({
      where: { id: req.userId },
      data: {
        primaryGenre,
        role,
        location,
        isProfileComplete: true
      }
    });

    res.json({ redirect: "/dashboard" });
  } catch {
    res.status(500).json({ message: "Profile update failed" });
  }
};
