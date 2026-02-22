import { Router } from "express";
import { uploadMedia } from "../controllers/uploadController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/", protect, uploadMedia);

export default router;