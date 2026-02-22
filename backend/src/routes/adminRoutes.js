import { Router } from "express";
const router = Router();

router.get("/test", (req, res) => {
  res.json({ ok: true, message: "admin routes working" });
});

export default router;