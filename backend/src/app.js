const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('express').json;

const authController = require('./controllers/authController');
const adminController = require('./controllers/adminController');
const waliController = require('./controllers/waliController');
const rankingController = require('./controllers/rankingController');
const { authMiddleware, requireRole } = require('./middleware/auth');
const authRoutes = require("./routes/authRoutes");

const studentRoutes = require("./routes/students"); // CRUD siswa (admin + wali)
const waliRoutes = require("./routes/wali");          // CRUD wali kelas
const criteriaRoutes = require('./routes/criteriaRoutes');
const kelasRoutes = require("./routes/kelasRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser());
app.use("/api/auth", authRoutes);
app.use("/api/kelas", kelasRoutes);

// Test root
app.get('/', (req, res) => res.json({ ok: true, service: 'spk-siswa-berprestasi backend' }));

// ==============================
// AUTH
// ==============================
app.post('/api/auth/login', authController.login);

// ==============================
// ROUTES
// ==============================

// Criteria
app.use('/api/criteria', criteriaRoutes);

// Students (CRUD siswa → admin + wali)
app.use("/api/students", studentRoutes);

// Wali kelas (CRUD wali kelas)
app.use("/api/wali", waliRoutes);

// ==============================
// ADMIN – CRUD tambahan (opsional jika memang ada di adminController)
// ==============================
if(adminController.createWali && adminController.listWali){
  app.post('/api/admin/wali', authMiddleware, requireRole(['admin']), adminController.createWali);
  app.get('/api/admin/wali', authMiddleware, requireRole(['admin']), adminController.listWali);
}

if(adminController.createCriteria && adminController.listCriteria){
  app.post('/api/admin/criteria', authMiddleware, requireRole(['admin']), adminController.createCriteria);
  app.get('/api/admin/criteria', authMiddleware, requireRole(['admin']), adminController.listCriteria);
}

// ==============================
// WALI – CRUD siswa & skor
// ==============================
if(waliController.createStudent && waliController.listStudents){
  app.post('/api/wali/students', authMiddleware, requireRole(['wali_kelas']), waliController.createStudent);
  app.get('/api/wali/students', authMiddleware, requireRole(['wali_kelas']), waliController.listStudents);
}

if(waliController.upsertScore && waliController.listScoresByStudent){
  app.post('/api/wali/scores', authMiddleware, requireRole(['wali_kelas']), waliController.upsertScore);
  app.get('/api/wali/students/:student_id/scores', authMiddleware, requireRole(['wali_kelas']), waliController.listScoresByStudent);
}

// ==============================
// RANKING
// ==============================
app.get('/api/ranking', authMiddleware, rankingController.rankingByClass);

// ==============================
// START SERVER
// ==============================
const port = process.env.PORT || 4000;
app.listen(port, () => console.log('Server listening on port', port));
