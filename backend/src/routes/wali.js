const express = require("express");
const router = express.Router();
const { authMiddleware, requireRole } = require("../middleware/auth");
const waliController = require("../controllers/waliController");

// Semua route hanya untuk admin
router.get("/", authMiddleware, requireRole(["admin"]), waliController.listWali);
router.post("/", authMiddleware, requireRole(["admin"]), waliController.createWali);
router.put("/:id", authMiddleware, requireRole(["admin"]), waliController.updateWali);
router.delete("/:id", authMiddleware, requireRole(["admin"]), waliController.deleteWali);

module.exports = router;
