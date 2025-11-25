const express = require("express");
const router = express.Router();

const { authMiddleware, requireRole } = require("../middleware/auth");
const studentController = require("../controllers/studentController");

// ==============================
// ADMIN – CRUD siswa
// ==============================
router.get(
  "/admin",
  authMiddleware,
  requireRole(["admin"]),
  studentController.getAllStudents
);

router.post(
  "/admin",
  authMiddleware,
  requireRole(["admin"]),
  studentController.createStudent
);

router.put(
  "/admin/:id",
  authMiddleware,
  requireRole(["admin"]),
  studentController.updateStudent
);

router.delete(
  "/admin/:id",
  authMiddleware,
  requireRole(["admin"]),
  studentController.deleteStudent
);

// ==============================
// WALI KELAS – siswa
// ==============================
router.post(
  "/",
  authMiddleware,
  requireRole(["wali_kelas"]),
  studentController.createStudentWali
);

router.get(
  "/",
  authMiddleware,
  requireRole(["wali_kelas"]),
  studentController.listStudentsWali
);

module.exports = router;
