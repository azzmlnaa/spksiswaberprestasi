const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ==============================
// IMPORT ROUTES
// ==============================
const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentsRoutes");
const waliRoutes = require("./routes/wali");
const criteriaRoutes = require('./routes/criteriaRoutes');
const kelasRoutes = require("./routes/kelasRoutes");
const scoreRoutes = require("./routes/scoreRoutes");
const { authMiddleware } = require('./middleware/auth');

// Wali kelas routes
app.use("/api/wali/students", require("./routes/waliStudentRoutes"));
app.use("/api/wali/scores", require("./routes/waliScoreRoutes"));


// ==============================
// ROOT TEST
// ==============================
app.get('/', (req, res) => {
  res.json({ ok: true, service: 'SPK Siswa Berprestasi Backend' });
});
app.get("/api/ranking/pdf", authMiddleware, rankingController.generatePdf);

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

// ==============================
// RANKING SAW
// ==============================
const rankingController = require('./controllers/rankingController');
app.get("/api/ranking", authMiddleware, rankingController.rankingByClass);

// ==============================
// RUN SERVER
// ==============================
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server berjalan di port ${port}`));
