const pool = require("../config/db");

// GET semua siswa di kelas wali
exports.listStudentsByWali = async (req, res) => {
  try {
    const class_id = req.user.class_id;

    const [rows] = await pool.query(
      "SELECT * FROM students WHERE class_id=?",
      [class_id]
    );

    res.json({
      status: "success",
      message: "Data siswa berdasarkan wali kelas",
      data: rows,
    });

  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// CREATE siswa baru di kelas wali
exports.createStudentByWali = async (req, res) => {
  try {
    const { name, nis } = req.body;
    const class_id = req.user.class_id;

    await pool.query(
      "INSERT INTO students (name, nis, class_id) VALUES (?, ?, ?)",
      [name, nis, class_id]
    );

    res.json({
      status: "success",
      message: "Siswa berhasil ditambahkan",
      data: { name, nis, class_id },
    });

  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// UPDATE siswa (hanya yang di kelas wali)
exports.updateStudentByWali = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, nis } = req.body;
    const class_id = req.user.class_id;

    await pool.query(
      "UPDATE students SET name=?, nis=? WHERE id=? AND class_id=?",
      [name, nis, id, class_id]
    );

    res.json({
      status: "success",
      message: "Siswa berhasil diupdate",
      data: { id, name, nis },
    });

  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// DELETE siswa hanya dari kelas wali
exports.deleteStudentByWali = async (req, res) => {
  try {
    const { id } = req.params;
    const class_id = req.user.class_id;

    await pool.query(
      "DELETE FROM students WHERE id=? AND class_id=?",
      [id, class_id]
    );

    res.json({
      status: "success",
      message: "Siswa berhasil dihapus",
    });

  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};
