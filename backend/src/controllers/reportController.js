const PDFDocument = require("pdfkit");
const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "spksiswa2"
});

// =======================================================
// CONTROLLER: LAPORAN SAW UNTUK WALIKELAS
// =======================================================
exports.getWaliKelasReport = async (req, res) => {
  try {
    const waliClass = req.user.class_id; // kelas wali kelas

    // ========== 1. Ambil semua siswa di kelas wali ==========
    const [students] = await db.query(
      `SELECT id, name FROM students WHERE class_id = ?`,
      [waliClass]
    );

    if (students.length === 0) {
      return res.status(404).json({ message: "Tidak ada siswa di kelas ini" });
    }

    // ========== 2. Ambil semua kriteria ==========
    const [criteria] = await db.query("SELECT * FROM criteria");

    // Ambil max/min untuk normalisasi
    const [stats] = await db.query(`
      SELECT criteria_id, MAX(score) AS max_score, MIN(score) AS min_score
      FROM scores
      GROUP BY criteria_id
    `);

    const statsMap = {};
    stats.forEach(s => statsMap[s.criteria_id] = s);

    // ========== 3. Hitung nilai SAW per siswa ==========
    const ranking = [];

    for (const s of students) {
      const [scores] = await db.query(
        `SELECT * FROM scores WHERE student_id = ?`,
        [s.id]
      );

      let totalScore = 0;

      for (const c of criteria) {
        const scoreRow = scores.find(sc => sc.criteria_id === c.id);
        if (!scoreRow) continue;

        const raw = scoreRow.score;
        const stat = statsMap[c.id];

        let normalized = 0;
        if (c.type === "benefit") {
          normalized = raw / stat.max_score;
        } else {
          normalized = stat.min_score / raw;
        }

        totalScore += normalized * c.weight;
      }

      ranking.push({
        student_name: s.name,
        total: totalScore
      });
    }

    ranking.sort((a, b) => b.total - a.total);

    // ========== 4. Nama kelas dan wali kelas ==========
    const [[classInfo]] = await db.query(
      "SELECT class_name FROM classes WHERE id = ?",
      [waliClass]
    );

    const waliName = req.user.full_name;
    const kepalaSekolah = "KEPALA SEKOLAH";

    // ========== 5. Generate PDF ==========
    const doc = new PDFDocument({ margin: 40 });
    res.setHeader("Content-Type", "application/pdf");
    doc.pipe(res);

    // Header
    doc.fontSize(18).text("LAPORAN RANKING SISWA (SAW)", { align: "center" });
    doc.moveDown(0.5);
    doc.fontSize(12).text(`Kelas: ${classInfo.class_name}`, { align: "center" });
    doc.text(`Tanggal: ${new Date().toLocaleDateString("id-ID")}`, {
      align: "center",
    });
    doc.moveDown(1);

    // Tabel
    doc.fontSize(12);
    doc.text("No", 40, doc.y, { continued: true });
    doc.text("Nama Siswa", 120, doc.y, { continued: true });
    doc.text("Skor SAW", 350, doc.y);
    doc.moveTo(40, doc.y + 5).lineTo(550, doc.y + 5).stroke();
    doc.moveDown(1);

    let no = 1;
    ranking.forEach(row => {
      doc.text(no++, 40, doc.y, { continued: true });
      doc.text(row.student_name, 120, doc.y, { continued: true });
      doc.text(row.total.toFixed(4), 350, doc.y);
      doc.moveDown(0.5);
    });

    // Tanda tangan
    doc.moveDown(3);
    doc.text("Mengetahui,", 40);
    doc.text("Kepala Sekolah", 40);
    doc.moveDown(3);
    doc.text("____________________", 40);
    doc.text(kepalaSekolah, 40);

    doc.text("Wali Kelas", 350);
    doc.moveDown(3);
    doc.text("____________________", 350);
    doc.text(waliName, 350);

    doc.end();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
exports.getWaliKelasData = async (req, res) => {
  try {
    const waliClass = req.user.class_id;

    const [students] = await db.query(
      `SELECT id, name FROM students WHERE class_id = ?`,
      [waliClass]
    );

    const [criteria] = await db.query(`SELECT * FROM criteria`);

    const [stats] = await db.query(`
      SELECT criteria_id, MAX(score) AS max_score, MIN(score) AS min_score
      FROM scores GROUP BY criteria_id
    `);

    const statsMap = {};
    stats.forEach(s => statsMap[s.criteria_id] = s);

    const ranking = [];

    for (const s of students) {
      const [scores] = await db.query(
        `SELECT * FROM scores WHERE student_id = ?`,
        [s.id]
      );

      let totalScore = 0;

      for (const c of criteria) {
        const row = scores.find(r => r.criteria_id === c.id);
        if (!row) continue;

        let normalized = 0;

        if (c.type === "benefit") {
          normalized = row.score / statsMap[c.id].max_score;
        } else {
          normalized = statsMap[c.id].min_score / row.score;
        }

        totalScore += normalized * c.weight;
      }

      ranking.push({
        student_name: s.name,
        total: totalScore
      });
    }

    ranking.sort((a, b) => b.total - a.total);

    res.json(ranking);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

