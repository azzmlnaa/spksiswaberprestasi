const db = require("../config/db");

// helper: run query dengan pool (mysql2 promise)
async function q(sql, params=[]) {
  const [rows] = await db.query(sql, params);
  return rows;
}

exports.rankingByClass = async (req, res) => {
  try {
    const user = req.user || {};
    let class_id = null;

    // ============================
    // 1. Jika wali_kelas -> pakai class_id dari token
    // ============================
    if (user.role === "wali_kelas") {
      if (!user.class_id) {
        return res.status(400).json({
          status: "error",
          message: "Wali kelas tidak memiliki class_id pada token."
        });
      }
      class_id = user.class_id;
    }

    // ============================
    // 2. Jika admin -> ambil SEMUA siswa dari SEMUA kelas
    // ============================
    if (user.role === "admin") {
      class_id = null; // tandai bahwa kita ambil semua kelas
    }

    // ============================
    // 3. Ambil siswa
    // ============================
    let students = [];

    if (class_id) {
      students = await q(
        "SELECT id, name, nis FROM students WHERE class_id = ? ORDER BY id ASC",
        [class_id]
      );
    } else {
      // admin ambil semua kelas
      students = await q(
        "SELECT id, name, nis FROM students ORDER BY class_id ASC, id ASC"
      );
    }

    if (students.length === 0) {
      return res.json({
        status: "success",
        data: [],
        message: "Tidak ada siswa ditemukan."
      });
    }

    // ============================
    // 4. Ambil kriteria
    // ============================
    const criteria = await q(
      "SELECT id, name, weight, type FROM criteria ORDER BY id ASC"
    );

    if (criteria.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "Tidak ada kriteria terdaftar."
      });
    }

    // ============================
    // 5. Ambil semua skor siswa
    // ============================
    const scoreRows = await q(`
      SELECT s.student_id, s.criteria_id, s.score
      FROM scores s
    `);

    // ============================
    // 6. Bangun matriks nilai
    // ============================
    const matrix = {};
    students.forEach((st) => {
      matrix[st.id] = {};
      criteria.forEach((c) => {
        matrix[st.id][c.id] = 0;
      });
    });

    scoreRows.forEach((r) => {
      if (matrix[r.student_id]) {
        matrix[r.student_id][r.criteria_id] = Number(r.score || 0);
      }
    });

    // ============================
    // 7. Normalisasi SAW
    // ============================
    const normalized = {};

    for (const c of criteria) {
      const values = students.map((st) => matrix[st.id][c.id] || 0);
      const nonZero = values.filter((v) => v > 0);

      const max = nonZero.length ? Math.max(...nonZero) : 0;
      const min = nonZero.length ? Math.min(...nonZero) : 0;

      for (const st of students) {
        if (!normalized[st.id]) normalized[st.id] = {};

        const val = matrix[st.id][c.id];

        if (c.type === "benefit") {
          normalized[st.id][c.id] = max === 0 ? 0 : val / max;
        } else {
          normalized[st.id][c.id] = val === 0 ? 0 : min / val;
        }
      }
    }

    // ============================
    // 8. Hitung skor akhir
    // ============================
    const results = students.map((st) => {
      let total = 0;

      criteria.forEach((c) => {
        total += (normalized[st.id][c.id] || 0) * Number(c.weight);
      });

      return {
        student_id: st.id,
        name: st.name,
        nis: st.nis,
        total: Number(total.toFixed(6)),
      };
    });

    // ============================
    // 9. Urutkan Desc (Ranking)
    // ============================
    results.sort((a, b) => b.total - a.total);

    return res.json({ status: "success", data: results });

  } catch (err) {
    console.error("rankingByClass error:", err);
    return res.status(500).json({ status: "error", message: err.message });
  }
};


exports.generatePdf = async (req, res) => {
  // placeholder — bisa implement nanti jika butuh PDF
  res.status(501).json({ status: "error", message: "PDF generation belum diimplementasikan" });
};
