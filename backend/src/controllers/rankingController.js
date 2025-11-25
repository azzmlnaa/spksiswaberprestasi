const db = require('../config/db');
const { computeSAW } = require('../services/sawService');

async function rankingByClass(req, res) {
  const class_id = req.query.class_id || req.user.class_id;
  if (!class_id) return res.status(400).json({ message: 'class_id required' });

  // fetch students
  const [students] = await db.query('SELECT id, name FROM students WHERE class_id = ?', [class_id]);
  const [criteria] = await db.query('SELECT id, weight, type, name FROM criteria ORDER BY id');
  const [scores] = await db.query('SELECT student_id, criteria_id, value FROM scores WHERE student_id IN (SELECT id FROM students WHERE class_id = ?)', [class_id]);

  const results = computeSAW(students, criteria, scores);
  res.json(results);
}

module.exports = { rankingByClass };
