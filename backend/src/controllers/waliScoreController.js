const pool = require("../config/db");

// GET semua nilai siswa pada kelas wali kelas
exports.getScores = async (req, res) => {
  try {
    const waliId = req.user.id;

    // Ambil class_id wali dari tabel users
    const [waliRows] = await pool.query(
      "SELECT class_id FROM users WHERE id = ? AND role = 'wali_kelas'",
      [waliId]
    );

    if (waliRows.length === 0 || !waliRows[0].class_id) {
      return res.status(400).json({
        status: "error",
        message: "Wali kelas tidak memiliki class_id."
      });
    }

    const classId = waliRows[0].class_id;

    // Ambil nilai semua siswa di kelas tersebut
    const [rows] = await pool.query(`
      SELECT 
        scores.id AS score_id,
        students.id AS student_id,
        students.name AS student_name,
        students.nis,
        criteria.id AS criteria_id,
        criteria.name AS criteria_name,
        scores.score
      FROM scores
      JOIN students ON students.id = scores.student_id
      JOIN criteria ON criteria.id = scores.criteria_id
      WHERE students.class_id = ?
    `, [classId]);

    res.json({
      status: "success",
      data: rows
    });

  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};


// ADD nilai siswa
exports.addScore = async (req, res) => {
  try {
    const { student_id, criteria_id, score } = req.body;

    await pool.query(
      "INSERT INTO scores (student_id, criteria_id, score) VALUES (?, ?, ?)",
      [student_id, criteria_id, score]
    );

    res.json({ status: "success", message: "Nilai berhasil ditambahkan" });

  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};


// UPDATE nilai siswa
exports.updateScore = async (req, res) => {
  try {
    const { id } = req.params;
    const { score } = req.body;

    await pool.query(
      "UPDATE scores SET score = ? WHERE id = ?",
      [score, id]
    );

    res.json({ status: "success", message: "Nilai berhasil diupdate" });

  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};


// DELETE nilai siswa
exports.deleteScore = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM scores WHERE id = ?", [id]);

    res.json({ status: "success", message: "Nilai berhasil dihapus" });

  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};
