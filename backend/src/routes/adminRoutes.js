import { Router } from "express";
import { reviewCampaign } from "../controllers/adminController.js";
import { protect, authorize } from "../middlewares/authMiddleware.js";

const router = Router();

router.use(protect);
router.use(authorize("admin"));

router.put("/campaigns/:id/review", reviewCampaign);

export default router;