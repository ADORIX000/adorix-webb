import { Router } from "express";
const router = Router();

router.get("/test", (req, res) => {
  res.json({ ok: true, message: "upload routes working" });
});

export default router;