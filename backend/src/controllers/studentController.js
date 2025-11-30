// controllers/studentController.js
const pool = require("../config/db");

// ==============================
// ADMIN – GET semua siswa (lengkap dengan nama kelas dan wali)
// ==============================

exports.getAllStudents = async (req, res) => {
  try {
    const [rows] = await pool.query(`
  SELECT 
    s.id,
    s.name,
    s.nis,
    s.class_id,
    c.class_name,
    u.full_name AS wali
  FROM students s
  LEFT JOIN classes c ON s.class_id = c.id
  LEFT JOIN users u ON u.class_id = c.id AND u.role = 'wali_kelas'
  ORDER BY s.id DESC
`);


    res.json({ status: "success", data: rows });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// ==============================
// ADMIN – CREATE siswa
// ==============================

exports.createStudent = async (req, res) => {
  try {
    const { name, nis, class_id } = req.body;

    if (!name || !nis || !class_id) {
      return res.status(400).json({
        status: "error",
        message: "name, nis, and class_id are required"
      });
    }

    const [result] = await pool.query(
      "INSERT INTO students (name, nis, class_id) VALUES (?, ?, ?)",
      [name, nis, class_id]
    );

    res.json({
      status: "success",
      message: `Siswa ${name} berhasil ditambahkan`,
      data: { id: result.insertId, name, nis, class_id }
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// ==============================
// ADMIN – UPDATE siswa
// ==============================

exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, nis, class_id } = req.body;

    if (!name && !nis && !class_id) {
      return res.status(400).json({
        status: "error",
        message: "At least one field (name, nis, class_id) must be provided"
      });
    }

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

// ==============================
// ADMIN – DELETE siswa
// ==============================

exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      "DELETE FROM students WHERE id = ?",
      [id]
    );

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
// WALI KELAS – LIS siswa per kelas wali
// ==============================

exports.listStudentsWali = async (req, res) => {
  try {
    const classId = req.user.class_id;

    if (!classId) {
      return res.status(400).json({
        status: "error",
        message: "Wali kelas tidak memiliki class_id."
      });
    }

    const [rows] = await pool.query(`
  SELECT 
    s.id,
    s.name,
    s.nis,
    s.class_id,
    c.class_name,
    u.full_name AS wali
  FROM students s
  LEFT JOIN classes c ON s.class_id = c.id
  LEFT JOIN users u ON u.class_id = c.id AND u.role = 'wali_kelas'
  WHERE s.class_id = ?
  ORDER BY s.id DESC
`, [classId]);


    res.json({
      status: "success",
      data: rows
    });

  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// ==============================
// WALI KELAS – CREATE siswa
// ==============================

exports.createStudentWali = async (req, res) => {
  try {
    const { name, nis } = req.body;
    const class_id = req.user.class_id;

    if (!name || !nis) {
      return res.status(400).json({
        status: "error",
        message: "name and nis are required"
      });
    }

    const [result] = await pool.query(
      "INSERT INTO students (name, nis, class_id) VALUES (?, ?, ?)",
      [name, nis, class_id]
    );

    res.json({
      status: "success",
      message: `Siswa ${name} berhasil ditambahkan oleh wali kelas`,
      data: { id: result.insertId, name, nis, class_id }
    });

  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
