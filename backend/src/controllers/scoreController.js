const pool = require("../config/db");

// ==============================
// GET semua nilai
// ==============================
exports.getAllScores = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT sc.id, sc.score,
             s.name AS student_name, s.nis,
             c.name AS criteria_name, c.weight, c.type
      FROM scores sc
      JOIN students s ON s.id = sc.student_id
      JOIN criteria c ON c.id = sc.criteria_id
      ORDER BY sc.id DESC
    `);

    res.json({ status: "success", data: rows });

  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// ==============================
// CREATE nilai
// ==============================
exports.createScore = async (req, res) => {
  try {
    const { student_id, criteria_id, score } = req.body;

    if (!student_id || !criteria_id || score === undefined) {
      return res.status(400).json({
        status: "error",
        message: "student_id, criteria_id, dan score wajib diisi"
      });
    }

    await pool.query(
      "INSERT INTO scores (student_id, criteria_id, score) VALUES (?, ?, ?)",
      [student_id, criteria_id, score]
    );

    res.json({
      status: "success",
      message: "Nilai berhasil ditambahkan"
    });

  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// ==============================
// UPDATE nilai
// ==============================
exports.updateScore = async (req, res) => {
  try {
    const { id } = req.params;
    const { student_id, criteria_id, score } = req.body;

    await pool.query(
      "UPDATE scores SET student_id=?, criteria_id=?, score=? WHERE id=?",
      [student_id, criteria_id, score, id]
    );

    res.json({
      status: "success",
      message: "Nilai berhasil diperbarui"
    });

  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// ==============================
// DELETE nilai
// ==============================
exports.deleteScore = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM scores WHERE id=?", [id]);

    res.json({
      status: "success",
      message: "Nilai berhasil dihapus"
    });

  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
