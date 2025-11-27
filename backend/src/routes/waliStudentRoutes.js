const express = require("express");
const router = express.Router();
const { authMiddleware, requireRole } = require("../middleware/auth");
const waliStudent = require("../controllers/waliStudentController");

router.get(
  "/",
  authMiddleware,
  requireRole(["wali_kelas"]),
  waliStudent.listStudentsByWali
);

router.post(
  "/",
  authMiddleware,
  requireRole(["wali_kelas"]),
  waliStudent.createStudentByWali
);

router.put(
  "/:id",
  authMiddleware,
  requireRole(["wali_kelas"]),
  waliStudent.updateStudentByWali
);

router.delete(
  "/:id",
  authMiddleware,
  requireRole(["wali_kelas"]),
  waliStudent.deleteStudentByWali
);

module.exports = router;
