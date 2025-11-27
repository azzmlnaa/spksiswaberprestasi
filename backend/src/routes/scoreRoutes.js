const express = require("express");
const router = express.Router();

const scoreController = require("../controllers/scoreController");
const { authMiddleware, requireRole } = require("../middleware/auth");

// ==============================
// ADMIN akses penuh
// ==============================
router.get("/", authMiddleware, requireRole(["admin"]), scoreController.getAllScores);
router.post("/", authMiddleware, requireRole(["admin"]), scoreController.createScore);
router.put("/:id", authMiddleware, requireRole(["admin"]), scoreController.updateScore);
router.delete("/:id", authMiddleware, requireRole(["admin"]), scoreController.deleteScore);

module.exports = router;
