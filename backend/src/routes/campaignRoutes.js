import { Router } from "express";
const router = Router();

router.get("/test", (req, res) => {
  res.json({ ok: true, message: "campaign routes working" });
});

export default router;