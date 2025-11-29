const express = require("express");
const router = express.Router();

const { authMiddleware, requireRole } = require("../middleware/auth");
const dashboardController = require("../controllers/dashboardController");

// ====================================
// Dashboard Admin Summary
// ====================================
router.get(
  "/",
  authMiddleware,
  requireRole(["admin"]),
  dashboardController.getDashboardStats
);

module.exports = router;
