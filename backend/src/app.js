const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ==============================
// IMPORT MIDDLEWARE
// ==============================
const { authMiddleware } = require('./middleware/auth');

// ==============================
// IMPORT CONTROLLERS
// ==============================
const rankingController = require('./controllers/rankingController');

// ==============================
// IMPORT ROUTES
// ==============================
const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentsRoutes");
const waliRoutes = require("./routes/wali");
const criteriaRoutes = require('./routes/criteriaRoutes');
const kelasRoutes = require("./routes/kelasRoutes");
const scoreRoutes = require("./routes/scoreRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const rankingRoutes = require("./routes/rankingRoutes");
const waliDashboardRoutes = require("./routes/waliDashboardRoutes");

// Wali kelas routes
const waliStudentRoutes = require("./routes/waliStudentRoutes");
const waliScoreRoutes = require("./routes/waliScoreRoutes");

// ==============================
// ROOT TEST
// ==============================
app.get('/', (req, res) => {
  res.json({ ok: true, service: 'SPK Siswa Berprestasi Backend' });
});

// ==============================
// AUTH
// ==============================
app.use("/api/auth", authRoutes);

// ==============================
// MASTER DATA
// ==============================
app.use("/api/kelas", kelasRoutes);
app.use("/api/criteria", criteriaRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/wali", waliRoutes);
app.use("/api/scores", scoreRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/ranking", rankingRoutes);
app.use("/api/wali/dashboard", waliDashboardRoutes);

// ==============================
// WALI KELAS
// ==============================
app.use("/api/wali/students", waliStudentRoutes);
app.use("/api/wali/scores", waliScoreRoutes);

// ==============================
// RANKING SAW
// ==============================
app.get("/api/ranking", authMiddleware, rankingController.rankingByClass);
app.get("/api/ranking/pdf", authMiddleware, rankingController.generatePdf);

// ==============================
// RUN SERVER
// ==============================
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server berjalan di port ${port}`));
