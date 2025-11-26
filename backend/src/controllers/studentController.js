// controllers/studentController.js
const pool = require("../config/db");

// ==============================
// ADMIN – CRUD siswa
// ==============================

exports.getAllStudents = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT id, name, nis, class_id FROM students ORDER BY id DESC");
    res.json({ status: "success", data: rows });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.createStudent = async (req, res) => {
  try {
    const { name, nis, class_id } = req.body;

    if (!name || !nis || !class_id) {
      return res.status(400).json({ status: "error", message: "name, nis, and class_id are required" });
    }

    const [result] = await pool.query(
      "INSERT INTO students (name, nis, class_id) VALUES (?, ?, ?)",
      [name, nis, class_id]
    );

    res.json({
      status: "success",
      message: `Siswa ${name} berhasil ditambahkan`,
      data: { id: result.insertId, name, nis, class_id },
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, nis, class_id } = req.body;

    if (!name && !nis && !class_id) {
      return res.status(400).json({ status: "error", message: "At least one field (name, nis, class_id) must be provided" });
    }

    // build dynamic update
    const fields = [];
    const params = [];
    if (name !== undefined) { fields.push("name = ?"); params.push(name); }
    if (nis !== undefined) { fields.push("nis = ?"); params.push(nis); }
    if (class_id !== undefined) { fields.push("class_id = ?"); params.push(class_id); }

    params.push(id);

    const sql = `UPDATE students SET ${fields.join(", ")} WHERE id = ?`;
    const [result] = await pool.query(sql, params);

    res.json({
      status: "success",
      message: `Siswa ${id} berhasil diupdate`,
      data: { id, changedRows: result.affectedRows }
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query("DELETE FROM students WHERE id = ?", [id]);

    res.json({
      status: "success",
      message: `Siswa ${id} berhasil dihapus`,
      data: { deletedRows: result.affectedRows }
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// ==============================
// WALI KELAS – siswa (sederhana)
// ==============================

exports.createStudentWali = async (req, res) => {
  try {
    const { name, nis, class_id } = req.body;

    if (!name || !nis || !class_id) {
      return res.status(400).json({ status: "error", message: "name, nis, and class_id are required" });
    }

    const [result] = await pool.query(
      "INSERT INTO students (name, nis, class_id) VALUES (?, ?, ?)",
      [name, nis, class_id]
    );

    res.json({
      status: "success",
      message: `Siswa ${name} berhasil ditambahkan oleh wali kelas`,
      data: { id: result.insertId, name, nis, class_id },
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.listStudentsWali = async (req, res) => {
  try {
    // Jika nanti ingin batasi berdasarkan wali -> gunakan req.user.class_id
    // contoh: const classId = req.user.class_id; SELECT ... WHERE class_id = ?
    const [rows] = await pool.query("SELECT id, name, nis, class_id FROM students ORDER BY id DESC");

    res.json({
      status: "success",
      data: rows,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
