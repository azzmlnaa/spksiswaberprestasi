const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ==============================
// IMPORT CONTROLLERS & ROUTES
// ==============================
const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentsRoutes");
const waliRoutes = require("./routes/wali");
const criteriaRoutes = require('./routes/criteriaRoutes');
const kelasRoutes = require("./routes/kelasRoutes");
const scoreRoutes = require("./routes/scoreRoutes");
const rankingController = require('./controllers/rankingController');

const { authMiddleware, requireRole } = require('./middleware/auth');
app.use("/api/wali/students", require("./routes/waliStudentRoutes"));

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
// MASTER DATA ROUTES
// ==============================
app.use("/api/kelas", kelasRoutes);
app.use("/api/criteria", criteriaRoutes);
app.use("/api/students", studentRoutes);   // CRUD siswa (admin + wali)
app.use("/api/wali", waliRoutes);          // CRUD wali kelas
app.use("/api/scores", scoreRoutes);       // CRUD nilai siswa (admin)

// ==============================
// RANKING SAW
// ==============================
app.get("/api/ranking", authMiddleware, rankingController.rankingByClass);

// ==============================
// SERVER START
// ==============================
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server berjalan di port ${port}`));
