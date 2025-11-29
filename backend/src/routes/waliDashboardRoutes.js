const express = require("express");
const router = express.Router();

const { authMiddleware, requireRole } = require("../middleware/auth");
const { dashboardWali } = require("../controllers/waliDashboardController");

router.get("/", authMiddleware, requireRole(["wali_kelas"]), dashboardWali);

module.exports = router;
