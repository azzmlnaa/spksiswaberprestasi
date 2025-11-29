const pool = require("../config/db");

// ==============================
// GET TOTAL DATA UNTUK DASHBOARD
// ==============================
exports.getDashboardStats = async (req, res) => {
  try {
    const conn = await pool.getConnection();

    const [students] = await conn.query(`SELECT COUNT(*) AS total FROM students`);
    const [criteria] = await conn.query(`SELECT COUNT(*) AS total FROM criteria`);
    const [scores] = await conn.query(`SELECT COUNT(*) AS total FROM scores`);

    conn.release();

    res.json({
      success: true,
      data: {
        totalStudents: students[0].total,
        totalCriteria: criteria[0].total,
        totalScores: scores[0].total
      }
    });

  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to load dashboard statistics"
    });
  }
};
