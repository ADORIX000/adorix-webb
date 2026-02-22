import { Router } from "express";
import { confirmPayment } from "../controllers/paymentController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/confirm", protect, confirmPayment);

export default router;
