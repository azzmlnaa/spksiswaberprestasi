const express = require("express");
const router = express.Router();

const { authMiddleware, requireRole } = require("../middleware/auth");
const {
  getAllKelas,
  createKelas,
  updateKelas,
  deleteKelas
} = require("../controllers/kelasController");

router.get("/", authMiddleware, requireRole(["admin"]), getAllKelas);
router.post("/", authMiddleware, requireRole(["admin"]), createKelas);
router.put("/:id", authMiddleware, requireRole(["admin"]), updateKelas);
router.delete("/:id", authMiddleware, requireRole(["admin"]), deleteKelas);

module.exports = router;
