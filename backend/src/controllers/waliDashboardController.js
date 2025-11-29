const db = require("../config/db");

async function q(sql, params = []) {
  const [rows] = await db.query(sql, params);
  return rows;
}

exports.dashboardWali = async (req, res) => {
  try {
    const user = req.user;

    if (user.role !== "wali_kelas") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const class_id = user.class_id;
    const username = user.username || "Wali Kelas";

    if (!class_id) {
      return res.status(400).json({ 
        status: "error",
        message: "Wali kelas tidak memiliki class_id."
      });
    }

    // Total siswa di kelas wali
    const totalSiswa = await q(
      "SELECT COUNT(*) AS total FROM students WHERE class_id = ?",
      [class_id]
    );

    // Siswa yang sudah dinilai (diambil dari scores)
    const siswaDinilai = await q(
      `SELECT COUNT(DISTINCT student_id) AS total 
       FROM scores 
       WHERE student_id IN (SELECT id FROM students WHERE class_id = ?)`,
      [class_id]
    );

    const total = totalSiswa[0].total;
    const sudah = siswaDinilai[0].total;
    const belum = total - sudah;

    return res.json({
      status: "success",
      data: {
        wali_name: username,
        total_siswa: total,
        siswa_dinilai: sudah,
        siswa_belum: belum
      }
    });

  } catch (err) {
    console.error("dashboard wali error:", err);
    return res.status(500).json({ message: err.message });
  }
};
