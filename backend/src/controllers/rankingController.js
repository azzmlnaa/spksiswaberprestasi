const pool = require("../config/db");

// ================================
// RANKING SAW PER KELAS
// ================================
exports.rankingByClass = async (req, res) => {
  try {
    const waliId = req.user.id;

    // ----- Ambil class wali -----
    const [wali] = await pool.query(
      "SELECT class_id FROM users WHERE id = ? AND role='wali'",
      [waliId]
    );

    if (wali.length === 0) {
      return res.status(400).json({ status: "error", message: "Wali tidak ditemukan." });
    }

    const classId = wali[0].class_id;

    // ----- Ambil semua kriteria -----
    const [criteria] = await pool.query("SELECT * FROM criteria ORDER BY id ASC");

    // ----- Ambil nilai siswa -----
    const [scores] = await pool.query(`
      SELECT 
        s.id AS student_id,
        s.name AS student_name,
        sc.criteria_id,
        sc.score
      FROM scores sc
      JOIN students s ON s.id = sc.student_id
      WHERE s.class_id = ?
      ORDER BY s.id ASC, sc.criteria_id ASC
    `, [classId]);

    if (scores.length === 0) {
      return res.json({ status: "success", data: [], message: "Belum ada nilai." });
    }

    // ---- Bentuk matriks per siswa ----
    const studentMap = {};
    scores.forEach(r => {
      if (!studentMap[r.student_id]) {
        studentMap[r.student_id] = {
          student_id: r.student_id,
          student_name: r.student_name,
          scores: {}
        };
      }
      studentMap[r.student_id].scores[r.criteria_id] = r.score;
    });

    const students = Object.values(studentMap);

    // ---- Normalisasi ----
    const norm = {};
    criteria.forEach(c => {
      const col = students.map(s => s.scores[c.id] || 0);

      const max = Math.max(...col);
      const min = Math.min(...col);

      norm[c.id] = students.map(s => {
        const x = s.scores[c.id] || 0;
        if (c.type === "benefit") return x / max;
        if (c.type === "cost") return min / x;
        return 0;
      });
    });

    // ---- Hitung V ----
    const ranking = students.map((s, i) => {
      let Vi = 0;
      criteria.forEach((c, idx) => {
        const weight = c.weight;
        Vi += norm[c.id][i] * weight;
      });

      return {
        student_id: s.student_id,
        student_name: s.student_name,
        final_score: Vi
      };
    });

    // ---- Urutkan ----
    ranking.sort((a, b) => b.final_score - a.final_score);

    res.json({
      status: "success",
      total_students: ranking.length,
      criteria: criteria,
      ranking: ranking
    });

  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};
