import { Router } from "express";
import { protect } from "../middleware/auth";
import { getProfile, completeProfile } from "../controllers/profile.controller";

const router = Router();

router.get("/", protect, getProfile);
router.post("/complete", protect, completeProfile);

export default router;
