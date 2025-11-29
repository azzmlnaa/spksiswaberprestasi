const express = require("express");
const router = express.Router();

const { authMiddleware, requireRole } = require("../middleware/auth");
const rankingController = require("../controllers/rankingController");

// ADMIN & WALI_KELAS boleh akses ranking
router.get(
  "/",
  authMiddleware,
  requireRole(["admin", "wali_kelas"]),
  rankingController.rankingByClass
);

module.exports = router;
