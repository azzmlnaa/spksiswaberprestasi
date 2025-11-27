const express = require("express");
const router = express.Router();
const { authMiddleware, requireRole } = require("../middleware/auth");
const waliScoreController = require("../controllers/waliScoreController");

// GET semua nilai siswa di kelasnya
router.get(
  "/",
  authMiddleware,
  requireRole(["wali_kelas"]),
  waliScoreController.getScores
);

// TAMBAH nilai
router.post(
  "/",
  authMiddleware,
  requireRole(["wali_kelas"]),
  waliScoreController.addScore
);

// UPDATE nilai
router.put(
  "/:id",
  authMiddleware,
  requireRole(["wali_kelas"]),
  waliScoreController.updateScore
);

// DELETE nilai
router.delete(
  "/:id",
  authMiddleware,
  requireRole(["wali_kelas"]),
  waliScoreController.deleteScore
);

module.exports = router;
