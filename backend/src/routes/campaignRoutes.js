import { Router } from "express";
import {
  createCampaign,
  getCampaigns,
  submitCampaign,
} from "../controllers/campaignController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = Router();

router.use(protect);

router.route("/").get(getCampaigns).post(createCampaign);
router.put("/:id/submit", submitCampaign);

export default router;