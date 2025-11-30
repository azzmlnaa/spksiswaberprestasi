const express = require("express");
const router = express.Router();
const { authMiddleware, requireRole } = require("../middleware/auth");

// 🔥 IMPORT DUA2 FUNGSI YANG ADA DI CONTROLLER
const { getWaliKelasReport, getWaliKelasData } = require("../controllers/reportController");

// GET /report/walikelas
router.get(
  "/walikelas",
  authMiddleware,
  requireRole(["wali_kelas"]),
  getWaliKelasReport
);

// GET /report/walikelas/data
router.get(
  "/walikelas/data",
  authMiddleware,
  requireRole(["wali_kelas"]),
  getWaliKelasData
);

module.exports = router;
