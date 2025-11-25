// controllers/studentController.js

// ==============================
// ADMIN – CRUD siswa
// ==============================
exports.getAllStudents = (req, res) => {
  // nanti bisa diganti dengan query database
  res.json({
    status: "success",
    message: "Lihat semua siswa",
    data: [],
  });
};

exports.createStudent = (req, res) => {
  const { name, kelas } = req.body;
  res.json({
    status: "success",
    message: `Siswa ${name} berhasil ditambahkan`,
    data: { name, kelas },
  });
};

exports.updateStudent = (req, res) => {
  const { id } = req.params;
  const { name, kelas } = req.body;
  res.json({
    status: "success",
    message: `Siswa ${id} berhasil diupdate`,
    data: { id, name, kelas },
  });
};

exports.deleteStudent = (req, res) => {
  const { id } = req.params;
  res.json({
    status: "success",
    message: `Siswa ${id} berhasil dihapus`,
  });
};

// ==============================
// WALI KELAS – CRUD siswa
// ==============================
exports.createStudentWali = (req, res) => {
  const { name, kelas } = req.body;
  res.json({
    status: "success",
    message: `Siswa ${name} berhasil ditambahkan oleh wali kelas`,
    data: { name, kelas },
  });
};

exports.listStudentsWali = (req, res) => {
  res.json({
    status: "success",
    message: "Daftar siswa untuk wali kelas",
    data: [],
  });
};
